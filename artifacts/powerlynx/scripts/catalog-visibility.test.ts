import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { allProducts, products, allCategoryTree, categoryTree, categories } from '../src/data/products';

test('Archived camera and motors stay preserved but leave all public catalog views', () => {
  const hidden = ['thermal-imaging-camera', 'condenser-fan-motor-single-speed', 'condenser-fan-motor-multi-hp'];
  assert.equal(allProducts.length, 20);
  assert.equal(products.length, 17);
  for (const slug of hidden) {
    const archived = allProducts.find(p => p.slug === slug);
    assert.ok(archived?.hidden);
    assert.ok(archived.image && archived.specs.length && archived.summary);
    assert.equal(products.find(p => p.slug === slug), undefined, 'Direct detail lookup must not reveal archived records');
    assert.ok(!products.slice(0, 4).some(p => p.slug === slug));
  }
  assert.ok(allCategoryTree.some(g => g.items.some(i => i.kind === 'category' && i.category === 'Motors')));
  assert.ok(!categories.includes('Motors'));
  assert.ok(!categories.includes('Thermal Camera'));
  assert.ok(categoryTree.every(g => g.items.length > 0));
  assert.ok(products.some(p => p.slug === 'flaring-tool'));
  assert.ok(products.some(p => p.models === 'AHR30'));
  const sitemap = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
  for (const slug of hidden) assert.ok(!sitemap.includes(`/products/${slug}`));
});
