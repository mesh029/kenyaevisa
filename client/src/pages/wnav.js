import React, { useEffect, useState } from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, TextField, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ScrollToTopOnMount from '../components/hoc/scrollToTop';

const WhoNeedsAVisa = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTerms, setSearchTerms] = useState({});


  const visaCategories = [
    {
      category: 'countries whose citizens may be issued with eVisas upon application (Category 2 Countries)',
      countries: [
        'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Bermuda', 'Argentina', 'Australia', 'Austria', 'Bahrain', 'Bangladesh',
        'Belarus', 'Belgium', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia', 'Brazil', 'Bulgaria', 'Burkina Faso', 'Cambodia',
        'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile (Nationalist)', 'China (China P.R.)', 'Columbia', 'Comoros',
        'Congo (Brazzaville)', 'Costa Rica', 'Cote de voire', 'Croatia', 'Cuba', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominican Republic',
        'DRC', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Finland', 'France', 'French Guyana',
        'Gabon', 'Georgia', 'Germany', 'Greece', 'Greenland', 'Guatemala', 'Guinea', 'Guinea Bissau', 'Haiti', 'Herzegovina',
        'Honduras', 'Hong Kong (Holders of Hong Kong special administrative region)', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran',
        'Ireland', 'Israel', 'Italy', 'Japan', 'Jordan', 'Kazakhstan', 'Kirghizstan', 'Korea (South)', 'Kuwait', 'Laos', 'Latvia',
        'Liberia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Madagascar', 'Malta', 'Marshall Islands', 'Mauritania',
        'Mexico', 'Micronesia', 'Moldavia', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar (Formerly Burma)',
        'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palau Pacific Isles',
        'Panama', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Russia', 'Salvador', 'Sao Tome and Principe',
        'Saudi Arabia', 'Serbia', 'Slovakia', 'Slovenia', 'Southern Sudan', 'Spain', 'Sri Lanka', 'St. Christopher Cape', 'Sudan', 'Suriname',
        'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'Timor East', 'Togo', 'Tunisia', 'Turkey', 'Turkmenistan', 'UAE', 'Ukraine',
        'United Kingdom', 'Uruguay', 'USA', 'Uzbekistan', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen',
      ],
    },
    {
      category: 'Nationals Exempted from obtaining a Visa (Category 1 Countries)',
      countries: [
        'Barbados', 'Malawi', 'St. Vincent and the Grenadines', 'Belize', 'Malaysia (For less than 30 days stay)',
        'St.Kitts and Nevis', 'Botswana', 'Mauritius', 'St.Lucia', 'Brunei', 'Namibia', 'Swaziland', 'Burundi', 'Nauru', 'Tanzania', 'Cyprus',
        'New Guinea', 'The Bahamas', 'Darussalam', 'Papua', 'Tobago', 'Dominica', 'Rwanda', 'Tonga', 'Fiji Island', 'Samoa', 'Trinidad',
        'Ghana', 'Seychelles', 'Tuvalu', 'Grenada', 'Sierra Leone', 'Uganda', 'Jamaica', 'Singapore', 'Vanuatu', 'Kiribati', 'Solomon Islands',
        'Zambia', 'Lesotho', 'South Africa (For less than 30 days stay)', 'Zimbabwe',
      ],
    },
    {
      category: 'Persons who do not require a Visa to Enter Kenya',
      countries: [
        'All persons whose passports are endorsed with valid Kenya re-entry passes or any other written authority in lieu of a re-entry pass.',
        'All passengers arriving and leaving by the same ship, and who do not leave the ship.',
        'All passengers in transit through Kenya arriving and leaving by the same aircraft or transferring to another aircraft and who do not leave the international transit lounges at the International Airports in Kenya.',
        'Holders of United Nations Organization Laissez-Passers whilst on official UN Business.',
        'Holders of African Union Laissez-Passers whilst on official A.U. business.',
        'Holders of African Development Bank Laissez-Passers, whilst on official A.D.B. business.',
        'Holders of Arab Bank for Economic Development in Africa Laissez-Passers, whilst on official ABEDA business.',
        'Holders of International Red Locust Control Organization for Central and Southern Africa Laissez-Passers, whilst on official I.R.L.C.O. business.',
        'Holders of Desert Locust Control Organization Laissez-Passers, whilst on official D.L.C.O. business.',
        'Holders of COMESA Laissez-Passers, whilst on official COMESA business. xi. Holders of International Monetary Fund and World Bank Laissez – Passers whilst on official IMF/World Bank Business.',
        'Holders of Inter-Governmental Authority on Development (IGAD) Laissez- Passers whilst on official IGAD business.',
        'Holders of African Airlines Travel Association (IATA) Laissez- Passers whilst on official business.',
        'Holders of Environment Liaison Centre International (ELCI) Laissez-Passers whilst on official ELCI business.',
        'Holders of Union of Radio, Television Network of Africa (URTNA) Laissez- Passers whilst on official URTNA business.',
        'Holders of International Labor Organization (ILO) Laissez – Passers whilst on official ILO business.',
        'Holders of Preferential Trade Area/Common Market of East & Southern African Bank Laissez – Passers whilst on official PTA/COMESA business.',
        'Holders of European Union Laissez – Passers whilst on official European Union business.',
        'Holders of CIP (International Potato Centre) Laissez – Passers whilst on official CIP business.',
        'Holders of African Reinsurance Corporation (ARC) Laissez – Passers whilst on official ARC business.',
        'Holders of Diplomatic and Service Passports from The Islamic Republic of Iran for a period not exceeding (30) Days stay.',
        'Holders of Diplomatic, Official, Special, and Service Passports, from The Republic of Turkey and members of their families holding valid Diplomatic, Official, Special, and Service Passports, while on Transit or Stay not exceeding ninety (90) days.',
        'Holders of Diplomatic, Official or Service Passports from the Federal Republic of Brazil for a period not exceeding ninety (90) days.',
        'Serving Members of the British Military (are exempted from visa formalities).',
        'The manifested crew of ships and aircraft passing through or stopping in Kenya for periods not exceeding seven (7) days in the case of air crew and fourteen (14) days for ship’s crew.',
        'Owners of private aircraft stopping over for refueling in Kenya and who do not leave the precincts of the airport.',
        // ... (add more countries if needed)
      ],
    },
    {
      category: 'Persons who cannot make e-Visa applications on eCitizen',
      introduction: (
        <Typography variant="body1" paragraph style={{ fontFamily: 'Roboto, sans-serif', color: 'rgba(0, 0, 0, 0.87)' }}>
          The following can NOT make e-Visa applications on eCitizen. These Nationals of countries, classes, and categories of persons require Referred Visas. The VISA applications are referred to the Director of Immigration services for processing and approval.
        </Typography>
      ),
      countries: [
        'Afghanistan', 'Armenia', 'Azerbaijan', 'Cameroon', 'Democratic People’s Republic of Korea (Formerly North Korea)', 'Eritrea', 'Iraq', 'Kosovo', 'Lebanon', 'Libya', 'Mali', 'Palestine', 'Senegal', 'Somalia', 'Syria', 'Tajikistan',
        /* Add more countries */
      ],
    },
  ];



  const filteredCountries = visaCategories.flatMap(category =>
    category.countries.filter(country =>
      country.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSearchChange = (category, value) => {
    setSearchTerms((prevSearchTerms) => ({ ...prevSearchTerms, [category]: value }));
  };

  const kenyaEVisaRequirements = [
    'Travel document with a validity of not less than six months.',
    'At least three blank pages in the holder\'s passport.',
    'Return ticket.',
    'Dully completed visa application form. N/B Incomplete application will be rejected.',
    'Providing false information will lead to automatic rejection of visa.',
    'Inappropriate document uploads will lead to automatic rejection of the visa.',
    'Children under sixteen [16] years are exempted from visa payment.',
    'Visa is required prior to entry into Kenya.',
    'The possession of a visa is not the final authority to enter the Republic of Kenya.',
    'Engaging in any form of business or employment without a requisite permit or pass is an offence.',
    'The validity of a multiple entry visas (MEV) will range from six to twelve (6-12) months.',
    'Possession of a multiple entry visa (MEV) does not confer residency.',
    'Upload recent colour passport size photo with a clear background.',
    'Holders of Diplomatic/Official/Service Passports coming on official duty qualify for Courtesy Visa.',
  ];
  return (
    <Container maxWidth="lg" style={{ marginTop: '80px', minHeight: '100vh' }}>
          <Typography variant="h6" gutterBottom style={{ fontFamily: 'Quicksand, sans-serif', color: '#1976D2', fontWeight: 'bold' }}>
            Who Needs a Visa to Come to Kenya?
          </Typography>
          {visaCategories.map((category) => (
            <Accordion key={category.category}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" gutterBottom style={{ fontFamily: 'Quicksand, sans-serif', color: '#1976D2', fontWeight: 'bold' }}>
                  {category.category}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                                  {category.introduction}

                {category.category !== 'Persons who do not require a Visa to Enter Kenya' && (
                  <TextField
                    label={`Search for your country in ${category.category}`}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => handleSearchChange(category.category, e.target.value)}
                  />
                )}
                <List style={{ listStyleType: 'none', padding: 0 }}>
                  {category.countries
                    .filter((country) =>
                      searchTerms[category.category]
                        ? country.toLowerCase().includes(searchTerms[category.category].toLowerCase())
                        : true
                    )
                    .map((country, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={country} />
                      </ListItem>
                    ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
  </Container>

  );
};

export default ScrollToTopOnMount(WhoNeedsAVisa);
