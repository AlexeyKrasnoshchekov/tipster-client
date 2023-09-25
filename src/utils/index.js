export function lcs(X, Y, count) {
  console.log('xx', X);
  let i = X.length;
  let j = Y.length;
  console.log('ii', i);

  if (i === 0 || j === 0) {
    return count;
  }

  if (X[i - 1] === Y[j - 1]) {
    count = lcs(i - 1, j - 1, count + 1);
  }
  count = Math.max(count, Math.max(lcs(i, j - 1, 0), lcs(i - 1, j, 0)));
  return count;
}

export function sortData(data) {
  return data.sort((a, b) => {
    if (a.homeTeam < b.homeTeam) {
      return -1;
    }
    if (a.homeTeam > b.homeTeam) {
      return 1;
    }
    return 0;
  });
}

export function getHomeTeamName(name) {

  switch (name) {
    case 'Maidenhead United':
      return 'Maidenhead Utd';
    case 'Bengaluru FC':
      return 'Bengaluru';
    case 'D. Zagreb':
      return 'Dinamo Zagreb';
    case 'Lech Poznań':
      return 'Lech Poznan';
    case 'Arsenal FC':
      return 'Arsenal';
    case 'Víkingur Reykjavik':
      return 'Vikingur Reykjavik';
    case 'Víkingur Reykjavík':
      return 'Vikingur Reykjavik';
    case '1. FC Magdeburg':
      return 'Magdeburg';
    case 'Al-Nassr Riyadh':
      return 'Al Nassr';
    case 'Birmingham City':
      return 'Birmingham';
    case 'FC Honka':
      return 'Honka';
    case 'Humaitá':
      return 'Humaita';
    case 'St. Liege':
      return 'Standard Liege';
    case 'Roda JC':
      return 'Roda';
    case 'Osnabrück':
      return 'Osnabruck';
    case 'VfL Osnabruck':
      return 'Osnabruck';
    case 'VfB Stuttgart':
      return 'Stuttgart';
    case 'AS Monaco':
      return 'Monaco';
    case 'FC Dordrecht':
      return 'Dordrecht';
    case 'Breda':
      return 'NAC Breda';
    case 'Aalborg BK':
      return 'Aalborg';
    case 'AaB':
      return 'Aalborg';
    case 'HB Køge':
      return 'Koge';
    case 'Koge BK':
      return 'Koge';
    case 'AaB Aalborg BK':
      return 'Aalborg';
    case 'Belshina Bobruisk':
      return 'Belshina';
    case 'BATE':
      return 'BATE Borisov';
    case 'Bate Borisov':
      return 'BATE Borisov';
    case 'UC Dublin':
      return 'UCD';
    case 'Norwich City':
      return 'Norwich';
    case 'Hull':
      return 'Hull City';
    case 'Huddersfield Town':
      return 'Huddersfield';
    case 'Bayern':
      return 'Bayern Munich';
    case 'FC Bayern München':
      return 'Bayern Munich';
    case 'Bayern München':
      return 'Bayern Munich';
    case 'ADO \'20':
      return 'ADO 20 Heemskerk';
    case 'ACV':
      return 'ACV Assen';
    case 'Lask Linz':
      return 'LASK Linz';
    case 'LASK':
      return 'LASK Linz';
    case 'Olympiacos Piraeus':
      return 'Olympiacos';
    case 'Fenerbahçe':
      return 'Fenerbahce';
    case 'PEPO Lappeenranta':
      return 'PEPO';
    case 'FC Lugano':
      return 'Lugano';
    case 'Ceilândia':
      return 'Ceilandia';
    case 'AC Milan':
      return 'Milan';
    case 'FK Zorya Luhansk':
      return 'Zorya';
    case 'Zorya Luhansk':
      return 'Zorya';
    case 'West Ham United':
      return 'West Ham';
    case 'Royale Union SG':
      return 'Union SG';
    case 'Union Saint-Gilloise':
      return 'Union SG';
    case 'Sparta Praha':
      return 'Sparta Prague';
    case 'Sheriff Tiraspol':
      return 'Sheriff';
    case 'Servette FC':
      return 'Servette';
    case 'Qarabağ':
      return 'Qarabag';
    case 'Ferencvarosi TC':
      return 'Ferencvaros';
    case 'Man Utd':
      return 'Manchester United';
    case 'NK Domzale':
      return 'Domzale';
    case 'Domžale':
      return 'Domzale';
    case 'Zrinjski':
      return 'Zrinjski Mostar';
    case 'Bayer':
      return 'Bayer Leverkusen';
    case 'Legia':
      return 'Legia Warsaw';
    case 'Club Brugge KV':
      return 'Club Brugge';
    case 'HJK helsinki':
      return 'HJK';
    case 'PSV Eindhoven':
      return 'PSV';
    case 'AS Roma':
      return 'Roma';
    case 'NAC':
      return 'NAC Breda';
    case 'Raith':
      return 'Raith Rovers';
    case 'Trem AP':
      return 'Trem';
    case 'Doxa Katokopia':
      return 'Doxa';
    case 'SV Zulte Waregem':
      return 'Zulte Waregem';
    case 'Zulte-Waregem':
      return 'Zulte Waregem';
    case 'Roda JC Kerkrade':
      return 'Roda';
    case 'Chennaiyin FC':
      return 'Chennaiyin';
    case 'Jagiellonia Białystok':
      return 'Jagiellonia';
    case 'Legia Warszawa':
      return 'Legia Warsaw';
    case 'Mainz 05':
      return 'Mainz';
    case 'FSV Mainz':
      return 'Mainz';
    case 'FSV Mainz 05':
      return 'Mainz';
    case 'São Luiz':
      return 'Sao Luiz';
    case 'FC Basel 1893':
      return 'Basel';
    case 'FC Midtjylland':
      return 'Midtjylland';
    case 'Accrington ST':
      return 'Accrington Stanley';
    case 'Sheffield United':
      return 'Sheff Utd';
    case 'Hertha BSC II':
      return 'Hertha Berlin II';
    case 'Sheffield Utd':
      return 'Sheff Utd';
    case 'Tala\'ea El Gaish':
      return 'Tala Al Jaish';
    case 'ADO Den Haag':
      return 'Den Haag';
    case 'AEL':
      return 'AEL Larisa';
    case 'Al Shabab Ksa':
      return 'Al Shabab';
    case 'AZ II':
      return 'AZ Reserves';
    case 'FC Barcelona':
      return 'Barcelona';
    case 'Girona FC':
      return 'Girona';
    case 'Atl. Madrid':
      return 'Atletico Madrid';
    case 'Apoel':
      return 'Apoel Nicosia';
    case 'AC Ajaccio':
      return 'Ajaccio';
    case 'AGF Aarhus':
      return 'Aarhus';
    case 'Hannover 96':
      return 'Hannover';
    case 'TSG Hoffenheim':
      return 'Hoffenheim';
    case '1899 Hoffenheim':
      return 'Hoffenheim';
    case 'Academia Deportiva Cantolao':
      return 'Academia Cantolao';
    case 'Hertha BSC':
      return 'Hertha Berlin';
    case 'Angers SCO':
      return 'Angers';
    case 'FC Koln':
      return 'Cologne';
    case 'Köln':
      return 'Cologne';
    case 'Degerfors IF':
      return 'Degerfors';
    case 'Apollon':
      return 'Apollon Limassol';
    case 'Amiens SC':
      return 'Amiens';
    case 'Oxford Utd':
      return 'Oxford United';
    case 'Arema FC':
      return 'Arema';
    case 'FC Zurich':
      return 'Zurich';
    case 'FC Utrecht':
      return 'Utrecht';
    case 'Zürich':
      return 'Zurich';
    case 'FC Halifax':
      return 'Halifax';
    case 'Halifax Town':
      return 'Halifax';
    case 'Geylang International':
      return 'Geylang';
    case 'Leicester City':
      return 'Leicester';
    case 'Darmstadt 98':
      return 'Darmstadt';
    case 'AZ':
      return 'AZ Alkmaar';
    case 'PSV II':
      return 'PSV Reserves';
    case 'Swansea':
      return 'Swansea City';
    case 'Lille Olympique SC':
      return 'Lille';
    case 'Verona':
      return 'Hellas Verona';
    case 'Luton Town F.C.':
      return 'Luton';
    case 'Luton Town':
      return 'Luton';
    case 'Al-Duhail SC':
      return 'Al Duhail';
    case 'Al-Rayyan':
      return 'Al Rayyan';
    case 'Baniyas SC':
      return 'Baniyas';
    case 'Bani Yas':
      return 'Baniyas';
    case '1. FC Union Berlin':
      return 'Union Berlin';
    case 'Arsenal London':
      return 'Arsenal';
    case 'PEC Zwolle':
      return 'Zwolle';
    case 'AC Omonia':
      return 'Omonia';
    case 'Coventry City':
      return 'Coventry';
    case 'Breidablik Kopavogur':
      return 'Breidablik';
    case 'FC Augsburg':
      return 'Augsburg';
    case 'FC Sion':
      return 'Sion';
    case 'St Patricks Athletic':
      return 'St Patricks';
    case 'St. Patricks Athletic':
      return 'St Patricks';
    case 'St. Patricks':
      return 'St Patricks';
    case 'Omonia Nicosia':
      return 'Omonia';
    case 'Pyunik Yerevan FC':
      return 'Pyunik Yerevan';
    case 'FC Pyunik Yerevan':
      return 'Pyunik Yerevan';
    case 'Gabala FK':
      return 'Gabala';
    case 'Racing de Ferrol':
      return 'Racing Ferrol';
    case 'Ferrol':
      return 'Racing Ferrol';
    case 'Galway United':
      return 'Galway';
    case 'Halmstads BK':
      return 'Halmstad';
    case 'FK Varnamo':
      return 'Varnamo';
    case 'FC Nordsjaeland':
      return 'Nordsjaeland';
    case 'FC Nordsjælland':
      return 'Nordsjaeland';
    case 'FC Nordsjaelland':
      return 'Nordsjaeland';
    case 'Dalian Professional':
      return 'Dalian Pro';
    case 'Charlton Athletic':
      return 'Charlton';
    case 'CFR 1907 Cluj':
      return 'CFR Cluj';
    case 'FC Volendam':
      return 'Volendam';
    case 'Al-Rayyan SC':
      return 'Al Rayyan';
    case 'Maringá':
      return 'Maringa';
    case 'Red Bull Salzburg':
      return 'Salzburg';
    case 'Plymouth Argyle':
      return 'Plymouth';
    case 'Ipswich Town':
      return 'Ipswich';
    case 'FC Porto':
      return 'Porto';
    case 'Almere City FC':
      return 'Almere City';
    case 'B. Monchengladbach':
      return 'Borussia Monchengladbach';
    case 'Borussia Mönchengladbach':
      return 'Borussia Monchengladbach';
    case 'Real Madrid CF':
      return 'Real Madrid';
    case 'FC Bayern Munich':
      return 'Bayern Munich';
    case 'Retrô':
      return 'Retro';
    case 'Galatasaray Istanbul':
      return 'Galatasaray';
    case 'FC Rotkreuz':
      return 'Rotkreuz';
    case 'Graafschap':
      return 'De Graafschap';
    case 'Steaua Bucharest':
      return 'FCSB';
    case 'Universidad Chile':
      return 'Universidad de Chile';
    case 'Al-Duhail':
      return 'Al Duhail';
    case 'Al-Ain':
      return 'Al Ain';
    case 'Viktoria Köln':
      return 'Viktoria Cologne';
    case 'FC Viktoria Köln':
      return 'Viktoria Cologne';
    case 'Szeged 2011':
      return 'Szeged';
    case 'Sporting CP':
      return 'Sporting Lisbon';
    case 'Seattle Sounders FC':
      return 'Seattle Sounders';
    case 'Jong PSV':
      return 'PSV Reserves';
    case 'MVV Maastricht':
      return 'Maastricht';
    case 'MVV':
      return 'Maastricht';
    case 'AFC Bournemouth':
      return 'Bournemouth';
    case 'Dortmund':
      return 'Borussia Dortmund';
    case 'Leverkusen':
      return 'Bayer Leverkusen';
    case 'Mazatlan FC':
      return 'Mazatlan';
    case 'Mazatlán':
      return 'Mazatlan';
    case 'KV Mechelen':
      return 'Mechelen';
    case 'Newry City AFC':
      return 'Newry City';
    case 'NorthEast United':
      return 'Northeast United';
    case 'Munchen 1860':
      return '1860 Munich';
    case 'SC Paderborn':
      return 'Paderborn';
    case 'Western United FC':
      return 'Western United';
    case 'RKC':
      return 'RKC Waalwijk';
    case 'Wehen SV':
      return 'Wehen Wiesbaden';
    case 'Widzew Łódź':
      return 'Widzew Lodz';
    case 'Aris Limassol':
      return 'Aris';
    case 'Derby':
      return 'Derby County';
    case 'Larne FC':
      return 'Larne';
    case 'Kerry FC':
      return 'Kerry';
    case 'Blackburn Rovers':
      return 'Blackburn';
    case 'Hyderabad FC':
      return 'Hyderabad';
    case 'Macarthur FC':
      return 'Macarthur';
    case 'Newcastle':
      return 'Newcastle United';
    case 'Nottingham':
      return 'Nottingham Forest';
    case 'Club América':
      return 'Club America';
    case 'Aswan Sc':
      return 'Aswan';
    case 'Atalanta Bergamo':
      return 'Atalanta';
    case 'Oldham':
      return 'Oldham Athletic';
    case 'Ferencvárosi TC':
      return 'Ferencvaros';
    case 'Ferencváros':
      return 'Ferencvaros';
    case 'Dorking Wanderers':
      return 'Dorking';
    case 'Dagenham & Redbridge':
      return 'Dag Red';
    case 'Dag & Red':
      return 'Dag Red';
    case 'Bradford (Park Avenue)':
      return 'Bradford PA';
    case 'Jong Ajax':
      return 'Ajax Reserves';
    case 'Ajax II':
      return 'Ajax Reserves';
    case 'Aldershot Town':
      return 'Aldershot';
    case 'Fleetwood':
      return 'Fleetwood Town';
    case 'Hamilton':
      return 'Hamilton Academical';
    case 'Grimsby':
      return 'Grimsby Town';
    case 'Utrecht II':
      return 'Utrecht Reserves';
    case 'FC Utrecht Reserves':
      return 'Utrecht Reserves';
    case 'Al-Gharafa':
      return 'Al Gharafa';
    case 'Al-Garrafa':
      return 'Al Gharafa';
    case 'Perth Glory FC':
      return 'Perth Glory';
    case 'Inter':
      return 'Inter Milan';
    case 'Albion':
      return 'Albion Rovers';
    case 'Maidstone Utd':
      return 'Maidstone';
    case 'IFK Göteborg':
      return 'Goteborg';
    case 'Al-Ahli Doha':
      return 'Al Ahli Doha';
    case 'Maidstone United':
      return 'Maidstone';
    case 'Neroca FC':
      return 'Neroca';
    case 'Notts Co':
      return 'Notts County';
    case 'NEROCA':
      return 'Neroca';
    case 'Rotherham':
      return 'Rotherham United';
    case 'Viborg FF':
      return 'Viborg';
    case 'Málaga':
      return 'Malaga';
    case 'Bhayangkara FC':
      return 'Bhayangkara';
    case 'Bhayangkara Solo':
      return 'Bhayangkara';
    case 'Al-Ahli':
      return 'Al Ahli';
    case 'Borussia Mgladbach':
      return 'Borussia Monchengladbach';
    case 'Gladbach':
      return 'Borussia Monchengladbach';
    case 'Queen\'s Park':
      return 'Queens Park';
    case 'Anorthosis Famagusta':
      return 'Anorthosis';
    case 'Odisha':
      return 'Odisha FC';
    case 'São Francisco':
      return 'Sao Francisco';
    case 'São Raimundo':
      return 'Sao Raimundo';
    case 'Sao Raimundo RR':
      return 'Sao Raimundo';
    case 'Sudeva':
      return 'Sudeva Moonlight';
    case 'Marília':
      return 'Marilia';
    case 'Municipal Grecia':
      return 'AD Grecia';
    case 'Nova Mutum EC':
      return 'Nova Mutum';
    case 'Alkmaar':
      return 'AZ Alkmaar';
    case 'FC Aarau':
      return 'Aarau';
    case 'Beşiktaş':
      return 'Besiktas';
    case 'Eyüpspor':
      return 'Eyupspor';
    case 'Fenerbahce (Tur)':
      return 'Fenerbahce';
    case 'Fenerbahce Istanbul':
      return 'Fenerbahce';
    case 'Twente (Ned)':
      return 'Twente';
    case 'Hacken':
      return 'BK Hacken';
    case 'Hobro I.K.':
      return 'Hobro';
    case 'Hobro IK':
      return 'Hobro';
    case 'KAA Gent':
      return 'Gent';
    case 'KRC Genk':
      return 'Genk';
    case 'KÍ':
      return 'KI Klaksvik';
    case 'Lille Osc':
      return 'Lille';
    case 'Ajax Amsterdam':
      return 'Ajax';
    case 'Ludogorets 1945 Razgrad':
      return 'Ludogorets';
    case 'Ludogorets Razgrad':
      return 'Ludogorets';
    default:
      return name;
  }
}
