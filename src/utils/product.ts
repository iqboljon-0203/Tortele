import { Product, WeightOption } from "@/config/brand";

export const getWeightOptions = (product: Product): WeightOption[] =>
  product.weightOptions ?? [
    {
      label: `Standart (${product.baseWeight})`,
      weightGrams: parseInt(product.baseWeight) || 400,
      multiplier: 1,
      calories: product.calories,
      servings: "1-2 kishilik",
    },
  ];

export const getFillings = (product: Product): string[] =>
  product.fillings ?? ["Klassik Tortel'e retsepti"];

/** Products with nothing to choose can be added straight from the card. */
export const canQuickAdd = (product: Product): boolean =>
  !product.weightOptions && !product.fillings && !product.allowsCustomText;

export const defaultCandles = (product: Product): number => (product.allowsCandles ? 1 : 0);
