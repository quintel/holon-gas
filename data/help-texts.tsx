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
  Solar collectors can help meet part of a building’s heat demand. In 2015, the installed capacity
  grew by 4.4%[^1], while from 2018 to our reference year, this growth amounted to only 2.5%[^2]. We
  take the growth rate of the previous year as our realistic estimate, and the 4.4% growth from 2015
  as our theoretical maximum growth.

  [^1]: ESTIF, “Solar Heat Markets in Europe: Trends and Market Statistics 2019,” 2020.
  [^2]: ESTIF, “Solar Thermal Markets in Europe: Trends and Market Statistics 2015,” 2016.
`;

const allMessages: Record<string, string> = {
  // Groups
  largeScaleEnergyStorage,
  coalPowerPlantCapacity,
  rooftopSolar,
  gasUseInIndustry,
};

export default allMessages;
