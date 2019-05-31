import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { string } from 'prop-types'

interface ZoneCodeToNameMapping {
  [key: string]: string
}

interface ZoneFilterHierarchy {
  [key: string]: ZoneCodeToNameMapping
}

const ZONES: ZoneFilterHierarchy = {
  Public: {
    P: 'Public',
  },
  'Residential, House Character Districts': {
    'RH-1': 'Residential - House, One Family (One Unit Per Lot)',
    'RH-1(D)':
      'Residential - House, One Family- Detached (One Unit Per Lot, Detached)',
    'RH-1(S)':
      'Residential - House, One Family- Secondary Unit (One Unit Per Lot, Minor Secondary Unit)',
    'RH-2': 'Residential - House, Two Family (Two Units Per Lot)',
    'RH-3': 'Residential - House, Three Family (Three Units Per Lot)',
  },
  'Residential, Mixed (Houses & Apartments) Districts': {
    'RM-1': 'Residential - Mixed, Low Density (1 Unit Per 800 Sf)',
    'RM-2': 'Residential - Mixed, Moderate Density (1 Unit Per 600 Sf)',
    'RM-3': 'Residential - Mixed, Medium Density (1 Unit Per 400 Sf)',
    'RM-4': 'Residential - Mixed, High Density (1 Unit Per 200 Sf)',
  },
  'Residential-Commercial Combined Districts': {
    'RC-3': 'Residential - Commercial, Medium Density (1 Unit Per 400 Sf)',
    'RC-4': 'Residential - Commercial, High Density (1 Unit Per 200 Sf)',
  },
  'Residential Transit Oriented Districts': {
    RTO: 'Residential Transit Oriented District',
    'RTO-M': 'Residential Transit Oriented, Mission',
  },
  'Downtown Residential Districts': {
    'RH-DTR': 'Rincon Hill Downtown Residential',
    'SB-DTR': 'South Beach Downtown Residential',
    'TB-DTR': 'Transbay Downtown Residential',
  },
  'Neighborhood Commercial Districts': {
    'NC-1': 'Neighborhood Commercial, Cluster (1 Commercial Story)',
    'NC-2': 'Neighborhood Commercial, Small Scale (2 Commercial Stories)',
    'NC-3': 'Neighborhood Commercial, Moderate Scale (3+ Commercial Stories)',
    'NC-S': 'Neighborhood Commercial, Shopping Center (2 Commercial Stories)',
    'NCD-24th-Noe-Valley': '24th Street- Noe Valley Neighborhood Commercial',
    'NCD-Broadway': 'Broadway Neighborhood Commercial',
    'NCD-Castro': 'Castro Street Neighborhood Commercial',
    'NCD-Excelsior':
      'Excelsior Outer Mission Street Neighborhood Commercial District',
    'NCD-Haight': 'Haight Street Neighborhood Commercial',
    'NCD-Inner Clement': 'Inner Clement Street Neighborhood Commercial',
    'NCD-Inner Sunset': 'Inner Sunset Neighborhood Commercial',
    'NCD-Irving': 'Irving Street Neighborhood Commercial District',
    'NCD-Japantown': 'Japantown Neighborhood Commercial District',
    'NCD-Judah': 'Judah Street Neighborhood Commercial District',
    'NCD-Noriega': 'Noriega Street Neighborhood Commercial District',
    'NCD-North Beach': 'North Beach Neighborhood Commercial',
    'NCD-Outer Clement': 'Outer Clement Street Neighborhood Commercial',
    'NCD-Pacific': 'Pacific Avenue Neighborhood Commercial',
    'NCD-Polk': 'Polk Street Neighborhood Commercial',
    'NCD-Sacramento': 'Sacramento Street Neighborhood Commercial',
    'NCD-Taraval': 'Taraval Street Neighborhood Commercial District',
    'NCD-Union': 'Union Street Neighborhood Commercial',
    'NCD-Upper Fillmore': 'Upper Fillmore Neighborhood Commercial District',
    'NCD-Upper Market': 'Upper Market Street Neighborhood Commercial',
    'NCD-West Portal': 'West Portal Avenue Neighborhood Commercial',
  },
  'Neighborhood Commercial Transit Districts': {
    'NCT-1': 'Neighborhood Commercial Transit 1',
    'NCT-2': 'Neighborhood Commercial Transit-2',
    'NCT-3': 'Moderate Scale Neighborhood Commercial Transit District',
    'NCT-24th-Mission': '24th-Mission Neighborhood Commercial Transit',
    'NCT-Divisadero':
      'Divisadero Street Neighborhood Commercial Transit District',
    'NCT-Fillmore': 'Fillmore Street Neighborhood Commercial Transit District',
    'NCT-Folsom': 'Folsom Street Neighborhood Commercial Transit',
    'NCT-Glen Park': 'Glen Park Neighborhood Commercial Transit',
    'NCT-Hayes': 'Hayes NCT',
    'NCT-Mission': 'Mission Street Neighborhood Commercial Transit',
    'NCT-Ocean': 'Ocean Avenue Neighborhood Commercial Transit',
    'NCT-Soma': 'Soma Neighborhood Commercial Transit',
    'NCT-Upper Market': 'Upper Market Neighborhood Commercial Transit',
    'NCT-Valencia': 'Valencia Street Neighborhood Commercial Transit',
  },
  'Chinatown Mixed Use Districts': {
    CRNC: 'Chinatown - Residential- Neighborhood Commercial',
    CVR: 'Chinatown - Visitor Retail',
    CCB: 'Chinatown - Community Business',
  },
  'Parkmerced Use Districts': {
    'PM-MU1': 'Parkmerced - Mixed Use-Social Heart',
    'PM-MU2': 'Parkmerced - Mixed Use-Neighborhood Commons',
    'PM-S': 'Parkmerced - School',
    'PM-CF': 'Parkmerced - Community/fitness',
    'PM-OS': 'Parkmerced - Open Space',
    'PM-R': 'Parkmerced - Residential',
  },
  'South Of Market Mixed Use Districts': {
    SPD: 'Soma-South Park',
    RED: 'South Of Market Residential Enclave',
    'RED-MX': 'Residential Enclave Mixed Use',
    RSD: 'Residentail/service',
    SLR: 'Service/light Industrial/residential',
    SLI: 'Soma Service/light Industrial',
    SALI: 'Service/arts/light Industrial',
    SSO: 'Soma Service/secondary Office',
  },
  'Eastern Neighborhoods Mixed Use Districts': {
    MUG: 'Mixed Use-General',
    WMUG: 'Western Soma Mixed Use-General',
    MUO: 'Mixed Use-Office',
    WMUO: 'Western Soma Mixed Use-Office',
    MUR: 'Mixed Use-Residential',
    UMU: 'Urban Mixed Use',
  },
  'Commercial Districts': {
    RCD: 'Regional Commercial',
    'C-2': 'Community Business',
    'C-3-S': 'Downtown Support',
    'C-3-R': 'Downtown Retail',
    'C-3-G': 'Downtown General',
    'C-3-O': 'Downtown Office',
    'C-3-O(SD)': 'Downtown Office (Special Development)',
  },
  'Redevelopment Agency Districts': {
    'MB-OS': 'Mission Bay Open Space',
    'MB-O': 'Mission Bay Office District',
    'MB-RA': 'See Mission Bay South Redevelopment Plans',
    'HP-RA': 'See Hunters Point Redevelopment Plans',
  },
  'Industrial Districts': {
    'M-1': 'Light Industrial',
    'M-2': 'Heavy Industrial',
  },
  'Production, Distribution & Repair Districts': {
    'PDR-1-B': 'PDR Light Industrial Buffer',
    'PDR-1-D': 'Production, Distribution & Repair - 1 - Design',
    'PDR-1-G': 'Production, Distribution & Repair - 1 - General',
    'PDR-2': 'PDR Production, Distribution, And Repair',
  },
}

let ZonesFilter = () => {
  let keys: string[] = []
  let keyElements: JSX.Element[] = []
  for (const key in ZONES) {
    let childElements: JSX.Element[] = []
    for (const childKey in ZONES[key]) {
      let childValue = ZONES[key][childKey]
      childElements = childElements.concat(
        <div key={childKey} style={{ paddingLeft: 20 }}>
          <input type="checkbox" name={childKey} checked />
          <label htmlFor={childKey}>{childValue}</label>
        </div>
      )
    }
    keys = keys.concat(key)
    keyElements = keyElements.concat(
      <div key={key}>
        <input type="checkbox" name={key} checked />
        <label htmlFor={key}>{key}</label>
        <div>{childElements}</div>
      </div>
    )
  }
  const [filterState, setFilterState] = useState()
  return <div>{keyElements}</div>
}

ReactDOM.render(<ZonesFilter />, document.getElementById('app'))
