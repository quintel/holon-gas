const howItWorks = `
  ### How it works

  The tool is composed of a number of sliders, that each change a variable
  in the underlying gas import calculation. In this tool, we focus on the short-term action,
  including only measures that are attainable in the span of a year.
`;

const sliderSettings = `
  ### Slider settings

  Each slider has a maximum, which is the most ambitious value based on previous growth figures or
  estimations from various institutions.

  Where applicable, each slider also has an info-button. You can click it to read the motivation for
  our calculation assumptions.

  Some sliders also have an intermediate mark. This is a more conservative and in our estimation
  more realistic estimation of what’s attainable in a year’s time.
`;

const resultsImports = `
  ### Results – Imports

  When changing slider settings, the model will, in real-time, calculate how much gas is still
  needed (left bar), and which share of the natural gas is imported from Russia (right bar), giving
  you a birds-eye view of the situation.
`;

const resultsCapitalFlow = `
  ### Results – Capital flow

  You will also be able to see what the volume of natural gas means in terms of capital. How much
  money will the Russian regime still be paid?
`;

const resultsCosts = `
  ### Results – Costs
  Naturally, everything comes at a cost. Here, you will see the (one-time)
  investment required to cover expenses.
`;

const resultsEmissions = `
  ### Results – Emissions

  Some investments also contribute to the sustainability transition. Here,
  you will be able to see the effect of the EU emissions with the new measures in place.
`;

const etm = `
  ### The Energy Transition Model
  The calculations are performed by the Energy Transition Model. If you’d like to explore more
  variables or longer-term scenarios, you can access the complete model via this link!
`;

export default {
  howItWorks,
  sliderSettings,
  resultsImports,
  resultsCapitalFlow,
  resultsCosts,
  resultsEmissions,
  etm,
} as const;
