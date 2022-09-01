import { oneLine, stripIndent } from "common-tags";
import { dumpTransforms, formatTransforms, noOp } from "./input-transforms";

const inputs: { [k: string]: Input } = {
  gas_cost: {
    value: 14.0,
    max: 188.0,
    min: 14.0,
    step: 1,
    name: "Gas price",
    description: oneLine`
      The gas price affects how competitive gas electricity plants are versus other generetion
      options. Higher gas prices will cause other sources of electricity to be preferred over gas
      sources.
    `,
  },
  extra_gas_from_groningen: {
    value: 3.9,
    max: 27.8,
    min: 3.9,
    recommended: 12,
    step: 0.1,
    name: "Groningen extraction",
    description: oneLine`
      Define the amount of natural gas that should be extracted from the Groningen gas field.
    `,
    helpText: stripIndent`
      For this year (2022), the Dutch government has set an extraction limit of 3.9bcm for the
      Groningen gas field[^1]. However, this decision was made at a different time. There are
      sufficient reserves, so, given that the income is distributed fairly amongst those affected by
      the extraction-induced earthquakes, more Russian gas could be replaced. Several news media
      report that an annual 12bcm extraction cap is considered safe[^2]. Considering the maximum
      annual extraction since 2015 as the technically feasible rate, 27.8bcm of gas could be won per
      annum[^3].

      [^1]: Ministerie van Economische Zaken en Klimaat, “Kamerbrief: Gaswinningsniveau Groningen gasjaar 2021-2022.” 2021.
      [^2]: Ministerie van Economische Zaken en Klimaat, “[SodM waarschuwt: Gaswinning Groningen nog steeds een veiligheidsrisico](https://www.sodm.nl/actueel/nieuws/2022/03/08/sodm-gaswinning-groningen-nog-steeds-een-veiligheidsrisico),” Mar. 08, 2022. Accessed: May 18, 2022.
      [^3]: NAM, “[Gas- en olie productiecijfers](https://www.nam.nl/gas-en-olie/gaswinning.html#iframe=L2VtYmVkL2NvbXBvbmVudC8_aWQ9Z2Fzd2lubmluZw),” 2022.
    `,
  },
  extra_gas_from_eu: {
    value: 27.8,
    max: 33.5,
    min: 27.8,
    step: 0.1,
    name: "Extraction other EU member states",
    description: "Set the amount of natural gas that should be extracted from other EU countries.",
    helpText: stripIndent`
      Starting 2015 the highest extraction of natural gas from Denmark, Germany, Italy, Poland and
      Romania amounted 33.5bcm[^1] (the estimated theoretical maximum). All preceding countries have
      sufficient proven reserves to meet this demand. In 2021, 27.8bcm worth of natural gas was
      extracted from these countries instead[^1].

      [^1]: BP Energy, “Statistical Review of World Energy globally consistent data on world energy markets and authoritative publications in the field of energy,” 2021.
    `,
  },
  // Other production
  coal_power_plant_capacity_conventional: {
    value: 16,
    max: 100,
    min: 16,
    recommended: 24,
    name: "Conventional",
  },
  coal_power_plant_capacity_lignite: {
    value: 58,
    max: 100,
    min: 58,
    recommended: 69,
    name: "Lignite",
  },
  injection_of_biomethane_in_gas_mix: {
    value: 4.5,
    max: 9,
    min: 4.5,
    recommended: 6,
    step: 0.1,
    name: "Using bio-methane as natural gas substitute",
    description: oneLine`
      Determine the share of the natural gas supply that should be replaced with biogas.
    `,
    helpText: stripIndent`
      Bio-methane is a biogas that can directly replace natural gas[^1]. In 2019, this
      injection-rate equalled 4.5%. For this year (2022), the EU wants to double bio-methane
      production under REPowerEU[^2]. When we assume that the injection rate of bio-gas increases
      proportionally, it would provide 9% of the EU’s natural gas as theoretical maximum for our
      reference year. However, we see that the maximum increase in biomethane plants in one year
      (since 2011) is only 33%[^3]. When we take this as realistic estimate, the gas injection rate
      would equal 6% instead.

      [^1]: W. Urban, “Biomethane injection into natural gas networks,” in The Biogas Handbook: Science, Production and Applications, 2013, pp. 378–403. doi: 10.1533/9780857097415.3.378.
      [^2]: Gas for Climate, “Commission announces groundbreaking biomethane target: ‘REPowerEU to cut dependence on Russian gas,’” 2022. https://gasforclimate2050.eu/news-item/commission-announces-groundbreaking-biomethane-target-repowereu-to-cut-dependence-on-russian-gas/
      [^3]: EBA, “EBA Statistical Report 2020,” 2020.
    `,
  },
  lng_imports: {
    value: 0,
    max: 60,
    min: 0,
    recommended: 20,
    step: 0.1,
    name: "Increase Liquified Natural Gas (LNG) imports",
    description: "What share of the natural gas supply should be met by LNG imports?",
    helpText: stripIndent`
      Theoretically, the EU could import an extra 60bcm worth of natural gas through LNG. However,
      according to the IEA[^1], the tight LNG market would drive up prices to the point of
      infeasibility when a 20bcm threshold is passed. In 2021, 13 EU countries together imported
      80bcm worth of natural gas[^2].

      [^1]: IEA, “A 10-Point Plan to Reduce the European Union’s Reliance on Russian Natural Gas,” 2022.
      [^2]: European Commission, “[Liquefied natural gas](https://energy.ec.europa.eu/topics/oil-gas-and-coal/liquefied-natural-gas_en).” (accessed May 19, 2022).
    `,
  },
  green_hydrogen: {
    value: 118,
    max: 1250,
    min: 118,
    recommended: 507,
    name: "Green hydrogen as natural gas alternative",
    description: "Set the capacity of green hydrogen production and generation capacity.",
    helpText: stripIndent`
      Similar to gas, we can use green hydrogen as a demand-response source for electricity. When we
      take the ‘Hydrogen strategy for a climate-neutral Europe’-approximation (40GW of green
      hydrogen by 2040 [^1], [^2]) for reference we find a theoretical 1.25GW maximum and a more
      realistic estimate using announced electrolyser capacity of 0.5GW [3]. The operational
      capacity by the end of 2021 was roughly 118MW [^3].

      [^1]: European Commission, “[A Hydrogen Strategy for a climate neutral Europe](https://ec.europa.eu/commission/presscorner/home/en),” 2020.
      [^2]: A. Wolf and N. Zander, “[Green Hydrogen in Europe: Do Strategies Meet Expectations?](https://www.intereconomics.eu/contents/year/2021/number/6/article/green-hydrogen-in-europe-do-strategies-meet-expectations.html),” Intereconomics, 2021.
      [^3]: J. S. Jones, “[Green hydrogen in Europe – 2022 is the year to make it a reality](https://www.enlit.world/hydrogen/green-hydrogen-in-europe-2022-is-the-year-to-make-it-a-reality/),” Feb. 22, 2022
    `,
  },
  renewable_energy_capacity: {
    value: 257677,
    max: 295040,
    min: 257677,
    recommended: 283445,
    name: "Renewable energy capacity",
    description: oneLine`
      How much renewable energy should be installed as alternative to natural gas as electricity
      source?
    `,
    helpText: stripIndent`
      According to data from the European Commission incorporated in the ETM, by 2019, there was
      258GW of renewable energy capacity installed. This grew by roughly 10 percent in 2020.
      According to the IEA’s ten-year plan, 20tWh of generated electricity could be added though a
      concerted policy effort (see [^1]). Adding this to our original estimate, we arrive at a total
      theoretical increase of 14.5%.

      [^1]: IEA, “A 10-Point Plan to Reduce the European Union’s Reliance on Russian Natural Gas,” 2022.
    `,
  },
  // Savings at home and in business
  electricity_storage_behind_the_meter: {
    value: 0.039,
    max: 0.06,
    min: 0.039,
    recommended: 0.052,
    step: 0.0001,
    name: "Behind-the-meter electricity storage",
    description: "What share of EU households should have a storage unit installed?",
    helpText: stripIndent`
      Using the Database of the European energy storage technologies and facilities[^1], an 436MW
      capacity of behind-the-meter energy storage is estimated. We take a realistic growth estimate
      of 33% and a theoretical estimate of 54% (taken from charts in[^2]). The latter correspond to
      0.052% and 0.060% of European homes.

      [^1]: Directorate-General For Energy, “Database of the European energy storage technologies and facilities [Data set],” 2020.
      [^2]: EASE Storage, “European Market Monitor on Energy Storage,” Eur. Mark. Monit. Energy Storage, vol. 44, no. March, p. 62, 2021.
    `,
  },
  insulation: {
    value: 0,
    max: 2,
    min: 0,
    step: 1,
    name: "Insulation of homes and offices",
    description: "Does the insulation of buildings grow linearly or exponentially?",
    helpText: stripIndent`
      Since there is no clear data on how fast homes and other buildings can be insulated, we look
      at the statistic development from 2011 to 2019 and project this ahead using an exponential
      approximation (theoretical scenario) and a linear approximation (realistic scenario).
    `,
  },
  growth_of_installed_heat_pumps: {
    value: 0,
    max: 14.7,
    min: 0,
    recommended: 9,
    step: 0.1,
    name: "Heat pumps as gas boiler replacement",
    description: oneLine`
      By what percentage does the number of heat pumps installed (both home and office) grow?
    `,
    helpText: stripIndent`
      Heat pumps can be used to satisfy heat demand through electricity rather than through the
      combustion of gas. From 2019 to 2020, the number of heat pumps in Europe grew by 9
      percent[^1], while the global scenario prediction by the IEA (approached linearly) amounts up
      to 14.7 percent. These will be our realistic and theoretical scenarios respectively. We
      presume an equal growth for all heat pump types (air, ground).

      [^1]: IEA, “Heat Pumps,” 2021.
    `,
  },
  thermostat_settings_percentage: {
    value: 0,
    max: 100,
    min: 0,
    step: 1,
    name: "Share of participating households",
    description: oneLine`
      What share of households would be willing to reduce their heat demand by lowering their home
      temperature?
    `,
  },
  thermostat_settings_reduce_temperature: {
    value: 0,
    max: 2,
    min: 0.0,
    step: 0.1,
    recommended: 1,
    name: "Thermostat temperature reduction",
    description: "By how much are they willing to reduce their home temperature?",
  },
  // Other
  rooftop_pv_households: {
    value: 7.6,
    max: 10.6,
    min: 7.6,
    step: 0.01,
    name: "Homes",
  },
  rooftop_pv_buildings: {
    value: 6.3,
    max: 10,
    min: 6.3,
    step: 0.01,
    name: "Businesses",
  },
  large_scale_storage_batteries: {
    value: 647,
    max: 1997,
    min: 647,
    recommended: 881,
    name: "Batteries",
  },
  large_scale_storage_reservoirs: {
    value: 45669,
    max: 67634,
    min: 45669,
    recommended: 48078,
    name: "Reservoirs",
  },
  solar_thermal_collectors: {
    value: 9.0,
    max: 9.4,
    min: 9.0,
    recommended: 9.2,
    step: 0.01,
    name: "Solar thermal collectors for heat demand",
    description: "By what percentage will the installed number of solar thermal collectors grow?",
    helpText: stripIndent`
      Solar collectors can help meet part of a building’s heat demand. In 2015, the installed
      capacity grew by 4.4%[^1], while from 2018 to our reference year, this growth amounted to only
      2.5%[^2]. We take the growth rate of the previous year as our realistic estimate, and the 4.4%
      growth from 2015 as our theoretical maximum growth.

      [^1]: ESTIF, “Solar Heat Markets in Europe: Trends and Market Statistics 2019,” 2020.
      [^2]: ESTIF, “Solar Thermal Markets in Europe: Trends and Market Statistics 2015,” 2016.
    `,
  },
  replacement_of_gas_by_oil_in_chemical_industry: {
    value: 0.0,
    max: 100.0,
    min: 0.0,
    name: "Replacement of gas by oil in chemical industry",
  },
  closure_of_fertiliser_industry: {
    value: 0.0,
    max: 100.0,
    min: 0.0,
    name: "Closure of fertiliser industry",
  },
};

export interface Input {
  /**
   * Optional markdown text shown when the user clicks the (?) button.
   */
  helpText?: string;
  /**
   * Optional small text shown below the slider title.
   */
  description?: string;
  /**
   * The maximum permitted value.
   */
  max: number;
  /**
   * The minimum permitted value.
   */
  min: number;
  /**
   * Human-readable name of the input.
   */
  name: string;
  /**
   * An optional recommended value for the slider. A mark will be placed on the slider track at the
   * corresponding position.
   */
  recommended?: number;
  /**
   * Interval between each user-selectable value.
   */
  step?: number;
  /**
   * The value of the input. Prior to any changes made by the user, this is the default value.
   */
  value: number;
}

/**
 * Given information about a UI input, dumps its value to a hash of inputs to be sent to ETEngine.
 *
 * @param key   The key of the input.
 * @param value The value of the input.
 * @param all   The full set of all UI inputs.
 */
export function dumpInput(
  key: keyof typeof inputs,
  value: number,
  all: typeof inputs
): { [k: string]: number } {
  return dumpTransforms[key]?.(key, value, all) || {};
}

export function isServerSide(key: keyof typeof inputs) {
  return dumpTransforms[key] !== noOp;
}

/**
 * Given an input key, the value as a formatted string.
 */
export function formatInput(key: keyof typeof inputs, value: number, precision: number): string {
  return formatTransforms[key] ? formatTransforms[key](value, precision) : value.toFixed(precision);
}

export type PresetSchema = {
  key: string;
  values: { [K in keyof typeof inputs]: number };
} & { key: string };

export default inputs;
