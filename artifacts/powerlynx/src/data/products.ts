// POWERLYNX product catalog data, sourced from the 2027 POWERLYNX catalog (Powerlink Inc.)
// Two lines: HVAC Tool and HVAC Supply.

import imgBlackRubberInsulatedLineSet from "@/assets/products/black-rubber-insulated-line-set.png";
import imgBrazingTorch from "@/assets/products/brazing-torch.png";
import imgCondenserFanMotorSingleSpeed from "@/assets/products/condenser-fan-motor-single-speed.png";
import imgDeburringTool from "@/assets/products/deburring-tool.png";
import imgDualBladeFoldingKnife from "@/assets/products/dual-blade-folding-knife.png";
import imgFlaringTool from "@/assets/products/flaring-tool.png";
import imgFoldingKnife from "@/assets/products/folding-knife.png";
import imgLedHeadlight from "@/assets/products/led-headlight.png";
import imgLedPenlight from "@/assets/products/led-penlight.png";
import imgManifoldGauge2valve from "@/assets/products/manifold-gauge-2valve.png";
import imgManifoldGauge4valve from "@/assets/products/manifold-gauge-4valve.png";
import imgRatchetingWrench from "@/assets/products/ratcheting-wrench.png";
import imgRatchetingWrenchAlt from "@/assets/products/ratcheting-wrench-alt.png";
import imgReamer from "@/assets/products/reamer.png";
import imgRefrigerantHoseSetStandard from "@/assets/products/refrigerant-hose-set-standard.png";
import imgRefrigerantHoseSetValve from "@/assets/products/refrigerant-hose-set-valve.png";
import imgThermalImagingCamera from "@/assets/products/thermal-imaging-camera.png";
import imgThermalImagingCameraAccessories from "@/assets/products/thermal-imaging-camera-accessories.png";
import imgTubeCutter from "@/assets/products/tube-cutter.png";
import imgTubeCutterMini from "@/assets/products/tube-cutter-mini.png";
import imgTubeExpander from "@/assets/products/tube-expander.png";
import imgTubeExpanderAccessories from "@/assets/products/tube-expander-accessories.png";
import imgTubeStraightener from "@/assets/products/tube-straightener.png";
import imgUtilityTorch from "@/assets/products/utility-torch.png";
import imgWhiteInsulatedLineSet from "@/assets/products/white-insulated-line-set.png";

export type ProductSpec = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  models: string; // model codes, as printed in the catalog
  line: "HVAC Tool" | "HVAC Supply";
  category: string;
  summary: string;
  bullets: string[];
  specs: ProductSpec[];
  image: string;
  gallery?: string[];
};

export const productLines = ["HVAC Tool", "HVAC Supply"] as const;

export const products: Product[] = [
  {
    slug: "white-insulated-line-set",
    image: imgWhiteInsulatedLineSet,
    name: "White Insulated Line Set w/ Flared Nuts",
    models: "1438W25F, 1412W25F, 1438W50F, 1412W50F",
    line: "HVAC Tool",
    category: "Line Sets",
    summary:
      "Copper line set with a three-layer insulation cover of embossed polyethylene film, weather-resistant materials, and thick insulating cotton. Corrosion, water, shock, and fire resistant with a flame-retardant, sound-absorbent build.",
    bullets: [
      "Operating range -40°F to 248°F (-40°C to 120°C)",
      "UV resistant, meets ASTM E84 and UL94",
      "99.9% pure copper, compliant with C12200 standards",
      "Soft annealed and easy to bend",
    ],
    specs: [
      { label: "1438W25F", value: '1/4" LL x 3/8" SL, 1/2" White Insulation, 25ft, w/ Flared Nuts' },
      { label: "1412W25F", value: '1/4" LL x 1/2" SL, 1/2" White Insulation, 25ft, w/ Flared Nuts' },
      { label: "1438W50F", value: '1/4" LL x 3/8" SL, 1/2" White Insulation, 50ft, w/ Flared Nuts' },
      { label: "1412W50F", value: '1/4" LL x 1/2" SL, 1/2" White Insulation, 50ft, w/ Flared Nuts' },
    ],
  },
  {
    slug: "black-rubber-insulated-line-set",
    image: imgBlackRubberInsulatedLineSet,
    name: "Black Rubber Insulated Line Set w/ Flared Nuts",
    models: "1438B25F, 1412B25F, 1438B50F, 1412B50F",
    line: "HVAC Tool",
    category: "Line Sets",
    summary:
      "The same corrosion, fire, and shock resistant performance as the white line set, wrapped in a rugged black rubber insulation for jobs that call for a darker finish.",
    bullets: [
      "Operating range -40°F to 248°F (-40°C to 120°C)",
      "UV resistant, meets ASTM E84 and UL94",
      "99.9% pure copper, compliant with C12200 standards",
      "Soft annealed and easy to bend",
    ],
    specs: [
      { label: "1438B25F", value: '1/4" LL x 3/8" SL, 1/2" Black Insulation, 25ft, w/ Flared Nuts' },
      { label: "1412B25F", value: '1/4" LL x 1/2" SL, 1/2" Black Insulation, 25ft, w/ Flared Nuts' },
      { label: "1438B50F", value: '1/4" LL x 3/8" SL, 1/2" Black Insulation, 50ft, w/ Flared Nuts' },
      { label: "1412B50F", value: '1/4" LL x 1/2" SL, 1/2" Black Insulation, 50ft, w/ Flared Nuts' },
    ],
  },
  {
    slug: "thermal-imaging-camera",
    image: imgThermalImagingCamera,
    gallery: [imgThermalImagingCameraAccessories],
    name: "Thermal Imaging Camera",
    models: "ATC100 / ATC200",
    line: "HVAC Tool",
    category: "Thermal Imaging Camera",
    summary:
      "A handheld thermal imaging camera for spotting hot/cold spots, refrigerant leaks, and electrical faults on the job.",
    bullets: [
      "120x90 (ATC100) or 256x192 (ATC200) infrared resolution",
      "Temperature range -4°F to 1022°F",
      "IP54 rated housing",
      '2.8" onboard display',
    ],
    specs: [
      { label: "ATC100", value: "120x90 IR resolution" },
      { label: "ATC200", value: "256x192 IR resolution" },
    ],
  },
  {
    slug: "brazing-torch",
    image: imgBrazingTorch,
    name: "Brazing Torch",
    models: "AT1LMP",
    line: "HVAC Tool",
    category: "Brazing / Utility Torch",
    summary:
      "A MAP-Pro/propane compatible brazing torch with automatic ignition and shutoff for fast, safe joint work.",
    bullets: [
      "Runs on MAP-Pro or propane",
      "Automatic ignition and flame shutoff",
      "Stainless steel tip",
    ],
    specs: [{ label: "Model", value: "AT1LMP" }],
  },
  {
    slug: "utility-torch",
    image: imgUtilityTorch,
    name: "Utility Torch",
    models: "AT1P",
    line: "HVAC Tool",
    category: "Brazing / Utility Torch",
    summary: "A compact propane-only torch built for precision soldering work.",
    bullets: ["Propane only", "Compact form factor for tight spaces"],
    specs: [{ label: "Model", value: "AT1P" }],
  },
  {
    slug: "manifold-gauge",
    image: imgManifoldGauge2valve,
    gallery: [imgManifoldGauge4valve],
    name: "Manifold Gauge (2-Valve / 4-Valve)",
    models: "AG2MA / AG2MB / AG4MA / AG4MB",
    line: "HVAC Tool",
    category: "Manifold Gauge",
    summary:
      'A precision manifold gauge set for reading and charging systems across common refrigerants, with a large 3-1/8" dial for easy reading in the field.',
    bullets: [
      "Compatible with R410A, R32, R454B, and R22",
      '3-1/8" dial face',
      "Range -30 inHg to 800 psi",
    ],
    specs: [
      { label: "AG2MA / AG2MB", value: "2-valve manifold gauge" },
      { label: "AG4MA / AG4MB", value: "4-valve manifold gauge" },
    ],
  },
  {
    slug: "refrigerant-hose-set",
    image: imgRefrigerantHoseSetStandard,
    gallery: [imgRefrigerantHoseSetValve],
    name: "Refrigerant Hose Set",
    models: "ARH5S / ARH5SV",
    line: "HVAC Tool",
    category: "Refrigerant Hose Set",
    summary:
      '5ft, 1/4"-1/4" refrigerant hose set rated for demanding charging and recovery work, available with or without a ball valve.',
    bullets: [
      "800 psi working pressure, 4000 psi burst pressure",
      "ARH5SV adds an integrated ball valve",
    ],
    specs: [
      { label: "ARH5S", value: "Standard, no ball valve" },
      { label: "ARH5SV", value: "With ball valve" },
    ],
  },
  {
    slug: "flaring-tool",
    image: imgFlaringTool,
    name: "Flaring Tool",
    models: "AHF6",
    line: "HVAC Tool",
    category: "Flaring Tool / Tube Expander / Tube Straightener",
    summary: 'A flaring tool covering 1/4" to 3/4" tube with a 45-degree eccentric cone for clean, consistent flares.',
    bullets: ['1/4" to 3/4" capacity', "45-degree eccentric cone", "Nickel-plated"],
    specs: [{ label: "Model", value: "AHF6" }],
  },
  {
    slug: "tube-expander",
    image: imgTubeExpander,
    gallery: [imgTubeExpanderAccessories],
    name: "Tube Expander",
    models: "AHE7",
    line: "HVAC Tool",
    category: "Flaring Tool / Tube Expander / Tube Straightener",
    summary: 'A folding tube expander covering 1/4" to 7/8" for fast swaging in the field.',
    bullets: ['1/4" to 7/8" capacity', "Folding design for jobsite portability"],
    specs: [{ label: "Model", value: "AHE7" }],
  },
  {
    slug: "tube-straightener",
    image: imgTubeStraightener,
    name: "Tube Straightener",
    models: "AHS2 / AHS3",
    line: "HVAC Tool",
    category: "Flaring Tool / Tube Expander / Tube Straightener",
    summary: 'A simple, durable tube straightener available in 1/4" and 3/8" sizes.',
    bullets: ['AHS2: 1/4"', 'AHS3: 3/8"'],
    specs: [
      { label: "AHS2", value: '1/4"' },
      { label: "AHS3", value: '3/8"' },
    ],
  },
  {
    slug: "tube-cutter",
    image: imgTubeCutter,
    gallery: [imgTubeCutterMini],
    name: "Tube Cutter",
    models: "AHC6C / AHC11C / AHC12",
    line: "HVAC Tool",
    category: "Tube Cutter / Reamer / Deburring Tool",
    summary: "A range of tube cutters sized for everything from tight refrigerant lines to larger copper pipe.",
    bullets: [
      'AHC6C: 1/8" to 3/4"',
      'AHC11C: 3/16" to 1-1/8"',
      'AHC12: 1/8" to 1-1/4"',
    ],
    specs: [
      { label: "AHC6C", value: '1/8" - 3/4"' },
      { label: "AHC11C", value: '3/16" - 1-1/8"' },
      { label: "AHC12", value: '1/8" - 1-1/4"' },
    ],
  },
  {
    slug: "reamer",
    image: imgReamer,
    name: "Internal & External Reamer",
    models: "AHR30",
    line: "HVAC Tool",
    category: "Tube Cutter / Reamer / Deburring Tool",
    summary: 'A dual-function internal and external reamer covering 1/8" to 1-1/2" tube.',
    bullets: ['1/8" to 1-1/2" capacity', "Internal and external reaming in one tool"],
    specs: [{ label: "Model", value: "AHR30" }],
  },
  {
    slug: "deburring-tool",
    image: imgDeburringTool,
    name: "Tube Deburring Tool",
    models: "AHD20",
    line: "HVAC Tool",
    category: "Tube Cutter / Reamer / Deburring Tool",
    summary: "A tube deburring tool that ships with two spare blades so it's ready for extended jobs.",
    bullets: ["Includes 2 spare blades"],
    specs: [{ label: "Model", value: "AHD20" }],
  },
  {
    slug: "ratcheting-wrench",
    image: imgRatchetingWrench,
    gallery: [imgRatchetingWrenchAlt],
    name: "Ratcheting Wrench",
    models: "AHW3 / AHW5 / AHWA",
    line: "HVAC Tool",
    category: "Ratcheting Wrench",
    summary: "A bi-directional ratcheting wrench for valve work, supplied with hex key adapters.",
    bullets: ["Switches between clockwise and counter-clockwise", "Includes hex key adapters"],
    specs: [
      { label: "AHW3", value: "Ratcheting wrench" },
      { label: "AHW5", value: "Ratcheting wrench" },
      { label: "AHWA", value: "Ratcheting wrench" },
    ],
  },
  {
    slug: "folding-knife",
    image: imgFoldingKnife,
    name: "Folding Knife",
    models: "AK1",
    line: "HVAC Tool",
    category: "Folding Knife / LED Penlight / LED Headlight",
    summary: "A jobsite folding knife with a built-in Phillips/flathead driver.",
    bullets: ["Combined Phillips and flathead driver"],
    specs: [{ label: "Model", value: "AK1" }],
  },
  {
    slug: "dual-blade-folding-knife",
    image: imgDualBladeFoldingKnife,
    name: "Dual-Blade Folding Knife",
    models: "AK2",
    line: "HVAC Tool",
    category: "Folding Knife / LED Penlight / LED Headlight",
    summary: "A dual-blade folding knife for cutting a wider range of jobsite materials.",
    bullets: ["Two blade configuration"],
    specs: [{ label: "Model", value: "AK2" }],
  },
  {
    slug: "led-penlight",
    image: imgLedPenlight,
    name: "LED Penlight",
    models: "AL1",
    line: "HVAC Tool",
    category: "Folding Knife / LED Penlight / LED Headlight",
    summary: "A compact 300-lumen penlight for inspecting tight, dark spaces.",
    bullets: ["300 lumens", "IP44 rated", "330ft throw distance"],
    specs: [{ label: "Model", value: "AL1" }],
  },
  {
    slug: "led-headlight",
    image: imgLedHeadlight,
    name: "LED Headlight",
    models: "AL2",
    line: "HVAC Tool",
    category: "Folding Knife / LED Penlight / LED Headlight",
    summary: "A hands-free 350-lumen headlight built for long jobs.",
    bullets: ["350 lumens", "IPX3 rated", "Up to 6 hours continuous use"],
    specs: [{ label: "Model", value: "AL2" }],
  },
  {
    slug: "condenser-fan-motor-single-speed",
    image: imgCondenserFanMotorSingleSpeed,
    name: "Condenser Fan Motor (Single Speed)",
    models: "ACM216 / ACM214",
    line: "HVAC Supply",
    category: "Condenser Fan Motor",
    summary:
      "A heavy-duty, weather-resistant single-speed condenser fan motor built to restore proper airflow across condenser coils and prevent system overheating.",
    bullets: [
      "NEMA Frame 48, Class B insulation",
      "UL recognized",
      "Reversible rotation, totally enclosed",
      "Thermal overload protection",
    ],
    specs: [
      { label: "ACM216", value: "1/6 HP, 208-230V, 0.9A, 1075 RPM" },
      { label: "ACM214", value: "1/4 HP, 208-230V, 1.8A, 1075 RPM" },
    ],
  },
  {
    slug: "condenser-fan-motor-multi-hp",
    image: imgCondenserFanMotorSingleSpeed,
    name: "Condenser Fan Motor (Multi-HP)",
    models: "ACM2M1",
    line: "HVAC Supply",
    category: "Condenser Fan Motor",
    summary:
      "A multi-horsepower condenser fan motor covering a wider service range for techs stocking fewer SKUs on the truck.",
    bullets: ["1/6 - 1/3 HP", "NEMA Frame 48, Class B insulation", "UL recognized"],
    specs: [{ label: "ACM2M1", value: "1/6-1/3 HP, 208-230V, 2.8A, 1075 RPM" }],
  },
];

export const categories = Array.from(new Set(products.map((p) => p.category)));
