import React, { useEffect, useState } from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, TextField, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ScrollToTopOnMount from '../components/hoc/scrollToTop';

const Requirements = () => {
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

  const kenyaEVisaRequirements = {
    title: 'Kenya Entry Requirements: Your Comprehensive Guide',
    details: [
      { title: 'Valid Travel Document', description: 'Ensure your travel document is valid for a minimum of <strong>six months</strong>.' },
      { title: 'Ample Passport Pages', description: 'Have a passport with at least <strong>three blank pages</strong> for entry stamps.' },
      { title: 'Return Ticket', description: 'Holders must present a valid <strong>return ticket</strong> upon arrival.' },
      { title: 'Completed Visa Application Form', description: 'Fill out the visa application form completely to avoid <strong>rejection</strong>. Incomplete applications will not be processed.' },
      { title: 'Truth Matters', description: 'Providing <strong>false information</strong> will result in automatic visa rejection.' },
      { title: 'Document Quality Matters', description: 'Uploading <strong>inappropriate documents</strong> will lead to automatic rejection.' },
      { title: 'Exemption for Children', description: 'Children under the age of <strong>sixteen [16]</strong> are <strong>exempted from visa payment</strong>.' },
      { title: 'Visa Required', description: 'Obtain a visa <strong>before entry into Kenya</strong>.' },
      { title: 'Visa Isn\'t a Guarantee', description: 'Remember, possessing a visa doesn\'t guarantee entry. Final authority rests with <strong>immigration officials</strong>.' },
      { title: 'Business or Employment Alert', description: 'Engaging in any form of <strong>business or employment without the requisite permit or pass is an offence</strong>.' },
      { title: 'Multiple Entry Visa Validity', description: 'Multiple entry visas (MEV) are valid for <strong>six to twelve (6-12) months</strong>.' },
      { title: 'Residency Clarification', description: 'Possession of an MEV <strong>does not confer residency</strong> in Kenya.' },
      { title: 'Photo Upload Requirement', description: 'Ensure you <strong>upload a recent color passport-size photo with a clear background</strong>.' },
      { title: 'Courtesy Visa for Diplomatic Passports', description: 'Holders of <strong>Diplomatic/Official/Service Passports</strong> coming on official duty qualify for a <strong>Courtesy Visa</strong>.' },
    ],
  };
  
  return (
    <Container maxWidth="lg" style={{ marginTop: '80px', minHeight: '100vh' }}>
        <Typography variant="h6" gutterBottom style={{ textAlign: 'center', fontFamily: 'Quicksand, sans-serif', color: '#1976D2', fontWeight: 'bold' }}>
      Requirements
    </Typography>
    <Typography variant="h6" gutterBottom style={{ fontFamily: 'Quicksand, sans-serif', color: '#1976D2', fontWeight: 'bold' }}>
    Embarking on a journey to Kenya? Make sure you meet the essential criteria
          </Typography>
          <List style={{ fontFamily: 'Roboto, sans-serif', color: 'rgba(0, 0, 0, 0.87)', paddingLeft: '20px' }}>
  {kenyaEVisaRequirements.details.map((requirement, index) => (
    <ListItem key={index}>
      <ListItemText
        primary={
          <span dangerouslySetInnerHTML={{ __html: `<strong>${requirement.title}</strong>:<br />${requirement.description}` }} />
        }
      />
    </ListItem>
  ))}
</List>
          <Typography variant="h6" gutterBottom style={{ fontFamily: 'Quicksand, sans-serif', color: '#1976D2', fontWeight: 'bold' }}>
            What Documents are Required for a Visa Application?
          </Typography>

          <Typography variant="body1" paragraph style={{ fontFamily: 'Roboto, sans-serif', color: 'rgba(0, 0, 0, 0.87)' }}>
            The specific documents required for a visa application may vary based on the type of visa and individual circumstances. However, common documents include:
          </Typography>
          <List style={{ fontFamily: 'Roboto, sans-serif', color: 'rgba(0, 0, 0, 0.87)', paddingLeft: '20px' }}>
            <ListItem>
              <ListItemText
                primary={<strong>For Single Entry Visa:</strong>}
                secondary={
                  <List>
                    <ListItem>
                      <ListItemText primary="Valid travel document not less than six months." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="At least one blank page in the holder's passport." />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={<strong>Validity:</strong>}
                        secondary="Category 2 single entry visa is valid for travel within 3 months from the date of issue beyond which another visa may need to be applied for."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={<strong>Fees:</strong>}
                        secondary="We charge a fee of 150 USD for the processing of this visa with a guarantee of delivery of not more than three working days from the day we receive your application."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={<strong>Attachments:</strong>}
                        secondary={
                          <List>
                            <ListItem>
                              <ListItemText
                                primary={<strong>For Business Visits:</strong>}
                                secondary={
                                  <List>
                                    <ListItem>
                                      <ListItemText primary="Invitation letter from the company." />
                                    </ListItem>
                                    <ListItem>
                                      <ListItemText primary="Copy of registration of the company." />
                                    </ListItem>
                                  </List>
                                }
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary={<strong>For Family Visits:</strong>}
                                secondary={
                                  <List>
                                    <ListItem>
                                      <ListItemText primary="Invitation letter from family." />
                                    </ListItem>
                                    <ListItem>
                                      <ListItemText primary="Identity card / Passport / Alien card / Entry permit of the host." />
                                    </ListItem>
                                  </List>
                                }
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary={<strong>For Tourists:</strong>}
                                secondary={
                                  <List>
                                    <ListItem>
                                      <ListItemText primary="Travel itinerary (Details about places to visit if going as a tourist)." />
                                    </ListItem>
                                    <ListItem>
                                      <ListItemText primary="Hotel bookings." />
                                    </ListItem>
                                    <ListItem>
                                      <ListItemText primary="Identity Documents." />
                                    </ListItem>
                                    <ListItem>
                                      <ListItemText primary="A clear passport biodata page." />
                                    </ListItem>
                                    <ListItem>
                                      <ListItemText primary="A clear photograph." />
                                    </ListItem>
                                  </List>
                                }
                              />
                            </ListItem>
                          </List>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={<strong>Photo Requirements:</strong>}
                        secondary={
                          <List>
                            <ListItem>
                              <ListItemText primary="Do not take a photograph or scan the photo in your passport biodata page." />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="The photo must have been taken within the past 6 months, showing your current appearance." />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Must be in color." />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Must show your full face, front view with a plain white or off-white background." />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Must be 2 by 2 inches." />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Must be taken in normal street attire. Uniforms should NOT be worn in photographs except religious attire that is worn daily." />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Do not wear a hat or headgear that obscures the hair or hairline." />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="If you normally wear prescription glasses, a hearing device, wig, or similar articles, they should be worn for your picture." />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Dark glasses or non-prescription glasses with tinted lenses are not acceptable unless you need them for medical reasons. A medical certificate may be required." />
                            </ListItem>
                          </List>
                        }
                      />
                    </ListItem>
                  </List>
                }
              />
            </ListItem>
          </List>

  </Container>

  );
};

export default ScrollToTopOnMount(Requirements);
