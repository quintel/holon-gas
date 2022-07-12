const largeScaleEnergyStorage = `
  Since gas is a demand-response electricity source, storage can be used to limit its necessary
  demand. For this endeavor we used the Database of the European energy storage technologies and
  facilities[^1].

  Completed projects account for 647MW and 45,699MW of (electro)chemical and pumped hydro storage
  capacity respectively. Our realistic estimate is that all projects currently under construction
  would be completed this year, yielding 881MW and 48,078MW of (electro)chemical and pumped hydro
  storage capacity respectively.

  The theoretical estimate presumes that also every
  announced project will be completed. This would result in 1,997MW and 67,634MW of
  (electro)chemical and pumped hydro storage capacity respectively.

  [^1]: Directorate-General For Energy, “Database of the European energy storage technologies and facilities [Data set],” 2020.
`;

const coalPowerPlantCapacity = `
  To reduce the volume of natural gas for electricity generation, existing coal plants can be set to
  work at higher capacity rates. Using the dataset on EU conventional power plants[^1], we
  hypothesise that the available capacity amounts to 105GW for coal, and 42GW for lignite power
  generation. In our reference year, 24% of the coal capacity was utilised (32% less than preceding
  year) and 69% of that of lignite (16% less than preceding year)[^2]. When we presume that the
  utilisation rate continues to decrease at these rates, we arrive a theoretical minimum of 16% for
  coal and 58% for lignite.

  [^1]: Open Power System Data, “Data Package Conventional power plants.” (Primary data from various sources, for a complete list see URL), 2020.
  [^2]: Agora Energiewende and Sandbag, “The European Power Sector in 2019: Up-to-Date Analysis on the Electricity Transition,” p. 49, 2019.
`;

const rooftopSolar = `
  Annually, rooftop-PV could supply 24.4% (680TWh) of the EU’s energy consumption[^1]. As of 2019,
  7.6% of this potential is set to have been utilised for homes and 6.3% for buildings. In the
  Netherlands, growth of installed capacity is presently limited mainly by the number of installers.
  We take therefor the Dutch growth rates for 2018-2019 (59% for businesses, and 39% for homes[^2])
  as theoretical maximum.

  [^1]: K. Bódis, I. Kougias, A. Jäger-Waldau, N. Taylor, and S. Szabó, “A high-resolution geospatial assessment of the rooftop solar photovoltaic potential in the European Union,” Renew. Sustain. Energy Rev., vol. 114, no. April, p. 109309, 2019.
  [^2]: CBS, “Opgesteld vermogen zonnepanelen.” 2020.
`;

const gasUseInIndustry = `
  We’ve seen during the COVID-pandemic that governments may choose to shut down certain sectors in
  the economy. In industry, natural gas is used as feedstock by the chemical industry and as
  hydrogen source in the fertilizer industry. In the chemical industry, oil can be used as
  substitute for the carbon feedstock for the production of basic chemicals.

  Since sufficient amounts of hydrogen cannot be generated through alternative means, the fertilizer
  industry will have to be shut down altogether.
`;

const results = `
  When we take our reference year to estimate the present year’s imports from Russia, we find that
  166bcm worth of natural gas will have to be covered[^1]. However, the present discourse mentions a
  155bcm target instead, based on imports for 2021 [^2], [^3].

  [^1]: BP, “Stratistical Review of World Energy 2020,” 2020.
  [^2]: European Commission, “Communication from the Commission to the European Parliament, the European Council, the Council, The European Economic and Social Committee and the Committee of the Regions,” 2022.
  [^3]: IEA, “A 10-Point Plan to Reduce the European Union’s Reliance on Russian Natural Gas,” 2022.
`;

const naturalGasDemand = `
  This chart shows the total demand for natural gas in your scenario, including the original value.
  Gas may be supplied by imports from Russia, imports from other countries, or by domestic
  production.
`;

const capitalFlow = `
  Taking the most recent costs of EU natural gas imports from Russia (February 2022 [^1]), we find a
  gas import price of 1.73EUR per kg, considering a density of 0.829 kg/m3 [^2] and currency
  exchange rate of 0.9117EUR/USD [^3].

  [^1]: UN Comtrade, “UN Comtrade Database,” 2022. [Online]. Available: https://comtrade.un.org/Data/. [Accessed: 14-Jun-2022].
  [^2]: CBS, “Weight units energy,” 2022. [Online]. Available: https://www.cbs.nl/en-gb/onze-diensten/methods/definitions/weight-units-energy#:~:text=- Natural gas%3A 1 m3 %3D,gas%3A variable dependent on composition. [Accessed: 14-Jun-2022].
  [^3]: Exchange Rates UK, “US Dollar to Euro Spot Exchange Rates for 2022,” 2022. [Online]. Available: https://www.exchangerates.org.uk/USD-EUR-spot-exchange-rates-history-2022.html. [Accessed: 14-Jun-2022].
`;

const allMessages: Record<string, string> = {
  // Groups
  largeScaleEnergyStorage,
  coalPowerPlantCapacity,
  rooftopSolar,
  gasUseInIndustry,

  // Charts
  results,
  naturalGasDemand,
  capitalFlow,
};

export default allMessages;
