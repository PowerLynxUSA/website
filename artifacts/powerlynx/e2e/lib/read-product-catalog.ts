import fs from 'node:fs';
import ts from 'typescript';

export type CatalogProduct = {
  slug: string;
  name: string;
  category: string;
  categoryGroup: string;
  summary: string;
  bullets: string[];
  specs: { label: string; value: string }[];
};

/**
 * src/data/products.ts imports product photos (PNG) directly, which only a
 * bundler like Vite can resolve — importing that module from a plain
 * Node/Playwright test crashes trying to parse binary PNG bytes as JS.
 *
 * Instead of a quote-sensitive regex (fragile: breaks if a value switches
 * between single/double quotes, or adds a formatting-only line break), this
 * parses the file with the TypeScript compiler API and reads the literal
 * property values straight out of the AST, so it tracks real source
 * formatting/quoting changes safely.
 */
export function readProductCatalog(productsFilePath: string): CatalogProduct[] {
  const sourceText = fs.readFileSync(productsFilePath, 'utf-8');
  const sourceFile = ts.createSourceFile(
    productsFilePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );

  function stringLiteralValue(node: ts.Node): string | undefined {
    if (ts.isStringLiteralLike(node)) {
      return node.text;
    }
    return undefined;
  }

  function stringArrayValues(node: ts.Node): string[] | undefined {
    if (!ts.isArrayLiteralExpression(node)) return undefined;
    const values: string[] = [];
    for (const element of node.elements) {
      const value = stringLiteralValue(element);
      if (value === undefined) return undefined;
      values.push(value);
    }
    return values;
  }

  function specArrayValues(node: ts.Node): { label: string; value: string }[] | undefined {
    if (!ts.isArrayLiteralExpression(node)) return undefined;
    const specs: { label: string; value: string }[] = [];
    for (const element of node.elements) {
      if (!ts.isObjectLiteralExpression(element)) return undefined;
      let label: string | undefined;
      let value: string | undefined;
      for (const prop of element.properties) {
        if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) continue;
        if (prop.name.text === 'label') label = stringLiteralValue(prop.initializer);
        if (prop.name.text === 'value') value = stringLiteralValue(prop.initializer);
      }
      if (label === undefined || value === undefined) return undefined;
      specs.push({ label, value });
    }
    return specs;
  }

  let productsArray: ts.ArrayLiteralExpression | undefined;

  ts.forEachChild(sourceFile, function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === 'products' &&
      node.initializer &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      productsArray = node.initializer;
      return;
    }
    ts.forEachChild(node, visit);
  });

  if (!productsArray) {
    throw new Error(`Could not find "export const products = [...]" in ${productsFilePath}`);
  }

  const catalog: CatalogProduct[] = [];

  productsArray.elements.forEach((element, index) => {
    if (!ts.isObjectLiteralExpression(element)) {
      throw new Error(
        `Product catalog entry #${index} in ${productsFilePath} is not a plain object literal — ` +
          `update readProductCatalog() to handle the new shape (e.g. spreads, computed properties) ` +
          `instead of silently skipping it.`,
      );
    }

    const record: Partial<CatalogProduct> = {};

    for (const prop of element.properties) {
      if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) continue;
      const key = prop.name.text;

      switch (key) {
        case 'slug':
        case 'name':
        case 'category':
        case 'categoryGroup':
        case 'summary': {
          const value = stringLiteralValue(prop.initializer);
          if (value !== undefined) record[key] = value;
          break;
        }
        case 'bullets': {
          const value = stringArrayValues(prop.initializer);
          if (value !== undefined) record.bullets = value;
          break;
        }
        case 'specs': {
          const value = specArrayValues(prop.initializer);
          if (value !== undefined) record.specs = value;
          break;
        }
        default:
          break;
      }
    }

    const missingFields = (['slug', 'name', 'category', 'categoryGroup', 'summary', 'bullets', 'specs'] as const).filter(
      (field) => record[field] === undefined,
    );
    if (missingFields.length > 0) {
      throw new Error(
        `Product catalog entry #${index} (slug=${record.slug ?? 'unknown'}) in ${productsFilePath} ` +
          `could not be parsed as a plain literal for: ${missingFields.join(', ')}. ` +
          `Update readProductCatalog() to handle the new syntax instead of silently skipping this product.`,
      );
    }

    catalog.push(record as CatalogProduct);
  });

  if (catalog.length !== productsArray.elements.length) {
    throw new Error(
      `Extracted ${catalog.length} products but the source array has ${productsArray.elements.length} elements ` +
        `in ${productsFilePath}.`,
    );
  }

  return catalog;
}
