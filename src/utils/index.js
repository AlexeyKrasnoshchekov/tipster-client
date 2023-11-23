import { format, addDays } from 'date-fns';

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

export function getSourcesProd(name) {
  switch (name) {
    case 'banker_draw':
    case 'banker_win':
    case 'banker_o25':
    case 'banker_btts':
      return 'bnk|';
    case 'wininbets_draw':
    case 'wininbets_win':
    case 'wininbets_o25':
    case 'wininbets_btts':
      return 'wnb|';
    case 'soccerpunt_draw':
    case 'soccerpunt_win':
    case 'soccerpunt_o25':
    case 'soccerpunt_btts':
      return 'spt_acc|';
    case 'trustpredict_draw':
    case 'trustpredict_win':
    case 'trustpredict_o25':
    case 'trustpredict_btts':
      return 'tst|';
    case 'fbp_draw':
    case 'fbp_win':
    case 'fbp_u25':
    case 'fbp_o25':
      return 'fbp|';
    case 'soccertipz_draw':
    case 'soccertipz_win':
    case 'soccertipz_u25':
      return 'stz|';
    case 'hello_draw':
    case 'hello_win':
    case 'hello_o25':
    case 'hello_btts':
      return 'hel|';
    case 'mybets_draw':
    case 'mybets_u25':
      return 'mbt|';
    case 'mybets_win':
      return 'mbt_acc|';
    case 'passion_draw':
    case 'passion_win':
    case 'passion_u25':
    case 'passion_o25':
    case 'passion_btts':
      return 'pas|';
    case 'victorspredict_draw':
    case 'victorspredict_win':
    case 'victorspredict_o25':
    case 'victorspredict_btts':
      return 'vic|';
    case 'kingspredict_win':
    case 'kingspredict_o25':
    case 'kingspredict_btts':
      return 'kng|';
    case 'kingspredict_acc_o25':
      return 'kng_acc|';
    case 'r2bet_draw':
    case 'r2bet_win':
    case 'r2bet_u25':
    case 'r2bet_o25':
    case 'r2bet_btts':
      return 'rbt|';
    case 'venas_draw':
    case 'venas_win':
    case 'venas_u25':
    case 'venas_o25':
    case 'venas_btts':
      return 'vns|';
    case 'prot_draw':
    case 'prot_win':
    case 'prot_o25':
    case 'prot_btts':
      return 'prt_acc|';
    case 'betimate_draw':
    case 'betimate_win':
    case 'betimate_u25':
    case 'betimate_o25':
    case 'betimate_btts':
      return 'bmt|';
    case 'vitibet_draw':
    case 'vitibet_win':
    case 'vitibet_u25':
    case 'vitibet_o25':
    case 'vitibet_btts':
      return 'vbt|';
    case 'fbpai_draw':
    case 'fbpai_u25':
      return 'fbi|';
    case 'footsuper_draw':
    case 'footsuper_win':
    case 'footsuper_u25':
    case 'footsuper_o25':
    case 'footsuper_btts':
      return 'fsr|';
    case 'mines_draw':
    case 'mines_win':
    case 'mines_u25':
      return 'mns|';
    case 'bettingtips_draw':
    case 'bettingtips_win':
    case 'bettingtips_u25':
    case 'bettingtips_o25':
    case 'bettingtips_btts':
      return 'bgt|';
    case 'predutd_win':
    case 'predutd_u25':
    case 'predutd_o25':
    case 'predutd_btts':
      return 'pdt|';
    case 'kcpredict_win':
    case 'kcpredict_o25':
    case 'kcpredict_btts':
      return 'kcp|';
    case 'o25tip_win':
    case 'o25tip':
      return 'otp_acc|';
    case 'footy_win':
    case 'footy_o25':
    case 'footy_btts':
      return 'fot|';
    case 'wincomparator_win':
    case 'wincomparator_u25':
    case 'wincomparator_o25':
    case 'wincomparator_btts':
      return 'cmp_acc|';
    case 'betclan_win':
    case 'betclan_u25':
    case 'betclan_o25':
    case 'betclan_btts':
      return 'cln_acc|';
    case 'bettingtips_acc_win':
    case 'bettingtips_acc_o25':
    case 'bettingtips_acc_btts':
      return 'bgt_acc|';
    case 'morph_o25':
      return 'mrp_acc|';
    case 'mighty_btts':
      return 'mgt|';
    case 'accum_o25':
    case 'accum_btts':
      return 'cum_acc|';
    case 'betshoot_o25':
    case 'betshoot_btts':
      return 'bsh_acc|';
    case 'mines_acc_o25':
      return 'mns_acc|';
    case 'wdw_o25':
      return 'wdw_acc|';
    case 'bigfree_win':
    case 'bigfree_u25':
    case 'bigfree_o25':
    case 'bigfree_btts':
      return 'bfr|';
    case 'fbp365_win':
    case 'fbp365_o25':
    case 'fbp365_btts':
      return 'fbt_acc|';
    case 'fst_o25':
    case 'fst_btts':
      return 'fst_acc|';
    case 'goalsnow_u25':
    case 'goalnow_o25':
    case 'goalsnow_btts':
      return 'gln_acc|';
    case 'betprotips_u25':
    case 'betprotips_o25':
    case 'betprotips_btts':
      return 'bpt_acc|';
    case 'footsuper_acc_o25':
    case 'footsuper_acc_btts':
      return 'fsr_acc|';
    case 'fbp_acc_u25':
    case 'fbp_acc_o25':
    case 'fbp_acc_btts':
      return 'fbp_acc|';
    default:
      return name;
  }
}
export function getSourcesProdInverse(name) {
  switch (name) {
    case 'bnk|':
      return 'banker';
    case 'wnb|':
      return 'wininbets';
    case 'spt_acc|':
      return 'soccerpunt_acc';
    case 'tst|':
      return 'trustpredict';
    case 'fbp|':
      return 'fbp';
    case 'stz|':
      return 'soccertipz';
    case 'hel|':
      return 'hello';
    case 'mbt|':
      return 'mybets';
    case 'mbt_acc|':
      return 'mybets_acc';
    case 'pas|':
      return 'passion';
    case 'vic|':
      return 'victorspredict';
    case 'kng|':
      return 'kingspredict';
    case 'kng_acc|':
      return 'kingspredict_acc';
    case 'rbt|':
      return 'r2bet';
    case 'vns|':
      return 'venas';
    case 'prt_acc|':
      return 'prot';
    case 'bmt|':
      return 'betimate';
    case 'vbt|':
      return 'vitibet';
    case 'fbi|':
      return 'fbpai';
    case 'fsr|':
      return 'footsuper';
    case 'mns|':
      return 'mines';
    case 'bgt|':
      return 'bettingtips';
    case 'pdt|':
      return 'predutd';
    case 'kcp|':
      return 'kcpredict';
    case 'otp_acc|':
      return 'o25tip';
    case 'fot|':
      return 'footy';
    case 'cmp_acc|':
      return 'wincomparator';
    case 'cln_acc|':
      return 'betclan';
    case 'bgt_acc|':
      return 'bettingtips_acc';
    case 'mrp_acc|':
      return 'morph_o25';
    case 'mgt|':
      return 'mighty';
    case 'cum_acc|':
      return 'accum';
    case 'bsh_acc|':
      return 'betshoot';
    case 'mns_acc|':
      return 'mines_acc_o25';
    case 'wdw_acc|':
      return 'wdw_o25';
    case 'bfr|':
      return 'bigfree';
    case 'fbt_acc|':
      return 'fbp365';
    case 'fst_acc|':
      return 'fst';
    case 'gln_acc|':
      return 'goalnow';
    case 'bpt_acc|':
      return 'betprotips';
    case 'fsr_acc|':
      return 'footsuper_acc';
    case 'fbp_acc|':
      return 'fbp_acc';
    default:
      return name;
  }
}

export const getDatesBetween = (startDate, endDate) => {
  let dates = [];
  let currentDate = new Date(startDate);
  // console.log('111', addDays(currentDate, 1));

  while (currentDate <= endDate) {
    dates.push(format(currentDate, 'dd.MM.yyyy'));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

export function getHomeTeamName(name) {
  switch (name) {
    case 'Maidenhead United':
      return 'Maidenhead Utd';
    case 'Bengaluru FC':
      return 'Bengaluru';
    case 'D. Zagreb':
      return 'Dinamo Zagreb';
    case 'AEZ Zakakiou':
      return 'Zakakiou';
    case 'AE Zakakiou':
      return 'Zakakiou';
    case 'IK Brage':
      return 'Brage';
    case 'St Patrick\'s':
      return 'St Patricks';
    case 'JK Tabasalu':
      return 'Tabasalu';
    case 'Apoel Nicosia':
      return 'APOEL';
    case ' Ajaccio':
      return 'Ajaccio';
    case 'AFylde':
      return 'Fylde';
    case 'TSteinbach':
      return 'Steinbach Haiger';
    case 'Wycombe Wanderers':
      return 'Wycombe';
    case 'Racing Club de Lens':
      return 'Lens';
    case 'A Fylde':
      return 'Fylde';
    case 'Örebro SK':
      return 'Orebro';
    case 'Orebro SK':
      return 'Orebro';
    case 'Wycombe Wanderer':
      return 'Wycombe';
    case 'Wrexham AFC':
      return 'Wrexham';
    case 'Wigan Athletic':
      return 'Wigan';
    case 'Utsikten':
      return 'Utsiktens BK';
    case 'Northampton Town':
      return 'Northampton';
    case 'Milton Keynes Do':
      return 'MK Dons';
    case 'Milton Keynes':
      return 'MK Dons';
    case 'Milton Keynes Dons':
      return 'MK Dons';
    case 'Manchester Unite':
      return 'Manchester United';
    case 'Huddersfield Tow':
      return 'Huddersfield';
    case 'Huddersfield Town':
      return 'Huddersfield';
    case 'Galatasaray SK':
      return 'Galatasaray';
    case 'Forest Green Rov':
      return 'Forest Green';
    case 'Forest Green Rovers':
      return 'Forest Green';
    case 'Farnborough Town':
      return 'Farnborough';
    case 'Elgin City':
      return 'Elgin';
    case 'Brescia Calcio':
      return 'Brescia';
    case 'Benfica Lisboa':
      return 'Benfica';
    case 'Athlone':
      return 'Athlone Town';
    case ' Utrecht (jun.)':
      return 'Utrecht Reserves';
    case ' Utrecht Reserves':
      return 'Utrecht Reserves';
    case 'Jong Utrecht':
      return 'Utrecht Reserves';
    case 'Odense BK':
      return 'Odense';
    case 'OB Odense':
      return 'Odense';
    case 'PReserves':
      return 'PSV Reserves';
    case 'Jong AZ Alkmaar':
      return 'AZ Reserves';
    case 'Malmö':
      return 'Malmo';
    case 'Würzburger Kickers':
      return 'Wurzburger Kickers';
    case 'TJ Start Brno':
      return 'Start Brno';
    case 'SpVgg Bayreuth':
      return 'Bayreuth';
    case 'Briton Ferry A':
      return 'Briton Ferry';
    case 'Ammanford A':
      return 'Ammanford';
    case 'Trau':
      return 'TRAU';
    case 'Šencur':
      return 'Sencur';
    case 'United IK Nordic':
      return 'Nordic United';
    case 'United Nordic':
      return 'Nordic United';
    case 'Saburtalo Tbilisi':
      return 'Saburtalo';
    case 'PSM':
      return 'PSM Makassar';
    case 'Nasaf Qarshi':
      return 'Nasaf';
    case 'KF Tirana':
      return 'Tirana';
    case 'Kolkheti Khobi':
      return 'Khobi';
    case 'Johor Darul Ta\'zim':
      return 'Johor Darul Takzim';
    case 'Johor DT':
      return 'Johor Darul Takzim';
    case 'Johor':
      return 'Johor Darul Takzim';
    case 'AD Grecia':
      return 'Grecia';
    case 'Falkenberg':
      return 'Falkenbergs';
    case 'Egnatia Rrogozhi':
      return 'Egnatia';
    case 'Egnatia Rrogozhinë':
      return 'Egnatia';
    case 'Chayka':
      return 'Chaika';
    case 'Al-Bataeh':
      return 'Al Bataeh';
    case 'Paradou AC':
      return 'Paradou';
    case 'AZ Picerno':
      return 'Picerno';
    case 'CSA Steaua Bucarest':
      return 'CSA Steaua';
    case 'Westerlo U21':
      return 'Westerlo Reserves';
    case 'KVC Westerlo U21':
      return 'Westerlo Reserves';
    case 'Velež':
      return 'Velez Mostar';
    case 'Velež Mostar':
      return 'Velez Mostar';
    case 'UT Arad':
      return 'UTA Arad';
    case 'Uta Arad':
      return 'UTA Arad';
    case 'Ruch Chorzów':
      return 'Ruch Chorzow';
    case 'Royal Pari Sion':
      return 'Royal Pari';
    case 'Rajasthan United':
      return 'Rajasthan';
    case 'NK Nafta 1903':
      return 'Nafta';
    case 'NK Jarun':
      return 'Jarun';
    case 'Jarun Zagreb':
      return 'Jarun';
    case 'Mornar Bar':
      return 'Mornar';
    case 'KF Ballkani':
      return 'Ballkani';
    case 'Hashtag United':
      return 'Hashtag';
    case 'Cali':
      return 'Deportivo Cali';
    case 'Dep. Cali':
      return 'Deportivo Cali';
    case 'Lommel United':
      return 'Lommel';
    case 'KV Oostende':
      return 'Oostende';
    case 'Hellerup IK':
      return 'Hellerup';
    case 'Hatta Dubai':
      return 'Hatta';
    case 'Hatta SC':
      return 'Hatta';
    case 'Gareji Sagarejo':
      return 'Gareji';
    case 'GKS Katowice':
      return 'Katowice';
    case 'Favoritner AC':
      return 'Favoritner';
    case 'B93 Copenhagen':
      return 'B 93';
    case 'B.93':
      return 'B 93';
    case 'Al Hilal Riyadh':
      return 'Al Hilal';
    case 'Trinity Zlin':
      return 'Fastav Zlin';
    case 'Zalaegerszeg TE':
      return 'Zalaegerszegi';
    case 'Wolfsbourg':
      return 'Wolfsburg';
    case 'FMainz 05':
      return 'Mainz';
    case 'Sarmiento Junin':
      return 'Sarmiento';
    case 'Van Charentsavan':
      return 'Van';
    case 'Turan Tovuz':
      return 'Turan';
    case 'Talleres':
      return 'Talleres Cordoba';
    case 'Zlaté Moravce':
      return 'Zlate Moravce';
    case 'ND Bilje':
      return 'Bilje';
    case 'Hillerød':
      return 'Hillerod';
    case 'Panathinaïkos':
      return 'Panathinaikos';
    case 'Tsc Backa Topola':
      return 'Backa Topola';
    case 'Olympiacos':
      return 'Olympiakos';
    case 'Sahab SC':
      return 'Sahab';
    case 'ABC':
      return 'ABC Natal';
    case 'SK Sturm Graz':
      return 'Sturm Graz';
    case 'Olympiakos Piraeus':
      return 'Olympiakos';
    case 'Juárez':
      return 'Juarez';
    case 'Dhamk':
      return 'Damac';
    case 'U.S. Ancona':
      return 'Ancona';
    case 'TBačka Topola':
      return 'Backa Topola';
    case 'SV Oberwart':
      return 'Oberwart';
    case 'Oberwart / Rotenturm':
      return 'Oberwart';
    case 'Rakow Czestochowa':
      return 'Rakow';
    case 'Potenza Calcio':
      return 'Potenza';
    case 'Olympic':
      return 'Olympic Tashkent';
    case 'KI Klaksvik':
      return 'Klaksvik';
    case 'KÍ Klaksvík':
      return 'Klaksvik';
    case 'Farul':
      return 'Farul Constanta';
    case 'Damak':
      return 'Damac';
    case 'Brighton Hove Al':
      return 'Brighton';
    case 'Bodo - Glimt':
      return 'Bodo/Glimt';
    case 'Al-Khaleej':
      return 'Al Khaleej';
    case 'Atletico Bucaramanga':
      return 'Bucaramanga';
    case 'Radnicki Kragujevac':
      return 'Radnicki 1923';
    case 'Arsenal de Sarandí':
      return 'Arsenal de Sarandi';
    case 'Arsenal Sarandi':
      return 'Arsenal de Sarandi';
    case 'Atlético Tucumán':
      return 'Atletico Tucuman';
    case 'Belgrano Cordoba':
      return 'Belgrano';
    case 'NK Tolmin':
      return 'Tolmin';
    case 'T1899 Hoffenheim II':
      return 'Hoffenheim II';
    case 'Paris Saint-Germain':
      return 'PSG';
    case 'Celtic Glasgow':
      return 'Celtic';
    case 'Stade Lavallois':
      return 'Laval';
    case 'Udinese Calcio':
      return 'Udinese';
    case 'I Varnamo':
      return 'Varnamo';
    case 'SPalermo':
      return 'Palermo';
    case 'Al Ittihad (Sau)':
      return 'Al Ittihad Jeddah';
    case 'Kobenhavn':
      return 'Copenhagen';
    case 'IF Elfsborg':
      return 'Elfsborg';
    case 'Jönköpings Södra':
      return 'Jonkopings Sodra';
    case 'Gil Vicente':
      return 'Gil Vicente';
    case 'Espanyol Barcelona':
      return 'Espanyol';
    case ' Trollhattan':
      return 'Trollhattan';
    case 'Atromitos Peristeri':
      return 'Atromitos';
    case 'Zeljeznicar Sarajevo':
      return 'Zeljeznicar';
    case 'Stjarnan Gardabaer':
      return 'Stjarnan';
    case 'Željezničar Sarajevo':
      return 'Zeljeznicar';
    case 'Viimsi JK':
      return 'Viimsi';
    case 'Trollhättan':
      return 'Trollhattan';
    case 'Strømsgodset II':
      return 'Stromsgodset 2';
    case 'Jong Utrecht':
      return 'Utrecht Reserves';
    case 'Cambuur Leeuwarden':
      return 'Cambuur';
    case 'Basel 1893':
      return 'Basel';
    case 'Atlético Madrid':
      return 'Atletico Madrid';
    case 'Clermont Foot':
      return 'Clermont';
    case 'Nottm Forest':
      return 'Nottingham Forest';
    case 'Jagiellonia Bialystok':
      return 'Jagiellonia';
    case 'Stjarnan Gardabae':
      return 'Stjarnan';
    case 'Amadora':
      return 'Estrela';
    case 'CD Alaves':
      return 'Alaves';
    case 'VVV-Venlo':
      return 'Venlo';
    case 'Cambuur LeeuwardenCambuur Leeuwarden':
      return 'Lech Poznan';
    case 'Arsenal FC':
      return 'Arsenal';
    case 'A. Lustenau':
      return 'Austria Lustenau';
    case 'Heracles Almelo':
      return 'Heracles';
    case 'KA Akureyri':
      return 'KA';
    case 'RWDM':
      return 'RWD Molenbeek';
    case 'RKC Waalwijk':
      return 'Waalwijk';
    case 'Tottenham Hotspur':
      return 'Tottenham';
    case 'AEK Athens':
      return 'AEK Athens';
    case 'Wolverhampton Wanderers':
      return 'Wolverhampton';
    case 'Wolveы':
      return 'Wolverhampton';
    case 'Stade-Lausanne-Ouchy':
      return 'Stade Lausanne-Ouchy';
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
    case 'ASepsi':
      return 'Sepsi';
    case 'Sepsi Sfântu Gheorghe':
      return 'Sepsi';
    case 'Sepsi Sf. Gheorghe':
      return 'Sepsi';
    case 'Paphos':
      return 'Pafos';
    case 'Värnamo':
      return 'Varnamo';
    case 'Pogoń Siedlce':
      return 'Pogon Siedlce';
    case 'Palermo SSD':
      return 'Palermo';
    case 'OB':
      return 'Odense';
    case 'Odense Boldklub':
      return 'Odense';
    case 'Jonkoping':
      return 'Jonkopings Sodra';
    case 'Jong AZ':
      return 'AZ Reserves';
    case 'Helmond':
      return 'Helmond Sport';
    case 'Karagumruk':
      return 'Fatih Karagumruk';
    case 'Fatih Karagümrükspor':
      return 'Fatih Karagumruk';
    case 'Fatih Karagumruk SK':
      return 'Fatih Karagumruk';
    case 'Fatih Karagümrük':
      return 'Fatih Karagumruk';
    case 'Chelmsford':
      return 'Chelmsford City';
    case 'ACF Fiorentina':
      return 'Fiorentina';
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
    case 'Viking FK':
      return 'Viking';
    case 'VDebrecen':
      return 'Debrecen';
    case 'SV Wehen Wiesbad':
      return 'Wehen';
    case 'SV Wehen Wiesbaden':
      return 'Wehen';
    case 'Wehen Wiesbaden':
      return 'Wehen';
    case 'Partizan Belgrad':
      return 'Partizan';
    case 'Partizan Belgrade':
      return 'Partizan';
    case 'Odd Grenland':
      return 'Odd';
    case 'ODD Ballklubb':
      return 'Odd';
    case 'Kryvbas KR':
      return 'Kryvbas';
    case 'Karmiotissa Pole':
      return 'Karmiotissa';
    case 'IK Sirius FK':
      return 'Sirius';
    case 'IK Sirius':
      return 'Sirius';
    case 'HNK Rijeka':
      return 'Rijeka';
    case 'Everton Vina del Mar':
      return 'Everton CD';
    case 'Everton de Vina':
      return 'Everton CD';
    case 'Etar Veliko Tarnovo':
      return 'Etar';
    case 'Debreceni VSC':
      return 'Debrecen';
    case 'Bokelj Kotor':
      return 'Bokelj';
    case 'Blau Weiss Linz':
      return 'BW Linz';
    case 'Benfica Lisbon':
      return 'Benfica';
    case 'Asane Fotball':
      return 'Asane';
    case 'Academica Coimbr':
      return 'Academica';
    case 'AIK Solna':
      return 'AIK';
    case 'AIK Stockholm':
      return 'AIK';
    case 'AIK stockholm':
      return 'AIK';
    case 'HB Køge':
      return 'Koge';
    case 'Avaí':
      return 'Avai';
    case 'Eintracht Brauns':
      return 'Eintracht Braunschweig';
    case 'Estrela Amadora':
      return 'Estrela';
    case 'Forfar Athletic':
      return 'Forfar';
    case 'Nea Salamina':
      return 'Nea Salamis';
    case 'Nea Salamis Famagusta':
      return 'Nea Salamis';
    case 'Paderborn 07':
      return 'Paderborn';
    case 'SK Prostejov':
      return 'Prostejov';
    case 'Prostějov':
      return 'Prostejov';
    case 'TSV Hartberg':
      return 'Hartberg';
    case 'Železničar Pančevo':
      return 'Zeleznicar';
    case 'Zeleznicar Pancevo':
      return 'Zeleznicar';
    case 'Zeleznicar Pance':
      return 'Zeleznicar';
    case 'Guimaraes':
      return 'Vitoria Guimaraes';
    case 'Vitoria Guimarae':
      return 'Vitoria Guimaraes';
    case 'HB Koge':
      return 'Koge';
    case 'Koge BK':
      return 'Koge';
    case 'Lyngby BK':
      return 'Lyngby';
    case 'Real Valladolid':
      return 'Valladolid';
    case 'Grasshopper Zurich':
      return 'Grasshoppers';
    case 'Heart of Midlothian':
      return 'Hearts';
    case 'AaB Aalborg BK':
      return 'Aalborg';
    case 'AaB Aalborg':
      return 'Aalborg';
    case 'Belshina Bobruisk':
      return 'Belshina';
    case 'BATE':
      return 'BATE Borisov';
    case 'Doxa':
      return 'Doxa Katokopias';
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
    case "ADO '20":
      return 'ADO 20 Heemskerk';
    case 'ACV':
      return 'ACV Assen';
    case 'Tammeka Tartu':
      return 'Tammeka';
    case 'Sint-Truidense':
      return 'St. Truiden';
    case 'Sint-Truiden':
      return 'St. Truiden';
    case 'Lask Linz':
      return 'LASK Linz';
    case 'Bhayangkara Surabaya United':
      return 'Bhayangkara';
    case 'LASK':
      return 'LASK Linz';
    case 'Olympiacos Piraeus':
      return 'Olympiacos';
    case 'Fenerbahçe':
      return 'Fenerbahce';
    case 'PEPO Lappeenranta':
      return 'PEPO';
    case 'Bodo Glimt':
      return 'Bodo/Glimt';
    case 'FC Lugano':
      return 'Lugano';
    case 'Bayer 04 Leverkusen':
      return 'Bayer Leverkusen';
    case 'Betis Sevilla':
      return 'Betis';
    case 'Molde FK':
      return 'Molde';
    case 'Cucuta Deportivo':
      return 'Cucuta';
    case 'Al Khaleej Saihat':
      return 'Al Khaleej';
    case 'Trnava':
      return 'Spartak Trnava';
    case 'Aston Villa Birmingham':
      return 'Aston Villa';
    case 'O. Ljubljana':
      return 'Olimpija Ljubljana';
    case 'Olimpia':
      return 'Olimpija Ljubljana';
    case 'Olimpija':
      return 'Olimpija Ljubljana';
    case 'Nordsjaeland':
      return 'Nordsjaelland';
    case 'Brighton & Hove Albion':
      return 'Brighton';
    case 'GenoaC':
      return 'Genoa';
    case 'Qarabagh':
      return 'Qarabag';
    case 'Nafta 1903':
      return 'Nafta';
    case 'RANS Cilegon':
      return 'RANS Nusantara';
    case 'Breidablik UBK':
      return 'Breidablik';
    case 'Qarabag Agdam':
      return 'Qarabag';
    case 'Čukarički':
      return 'Cukaricki';
    case 'West HAm':
      return 'West Ham';
    case 'Viktoria Plze':
      return 'Viktoria Plzen';
    case 'Plzen':
      return 'Viktoria Plzen';
    case 'Viktoria Plzeň':
      return 'Viktoria Plzen';
    case 'San Luis Quillota':
      return 'San Luis';
    case 'Sabah (Mys)':
      return 'Sabah';
    case 'Standard Liège':
      return 'Standard Liege';
    case 'Standard de Liege':
      return 'Standard Liege';
    case 'Schalke 04':
      return 'Schalke';
    case 'Ranheim Fotball':
      return 'Ranheim';
    case 'Panathinaikos Athens':
      return 'Panathinaikos';
    case 'Lierse Kempenzonen':
      return 'Lierse';
    case 'Lierse K':
      return 'Lierse';
    case 'Lausanne Sports':
      return 'Lausanne Sport';
    case 'Ingolstadt 04':
      return 'Ingolstadt';
    case 'IVarnamo':
      return 'Varnamo';
    case 'Baerum SK':
      return 'Baerum';
    case 'IL Sandviken':
      return 'Sandviken';
    case 'Flekkeroy IL':
      return 'Flekkeroy';
    case 'St Mirren':
      return 'St. Mirren';
    case 'Helsingør':
      return 'Helsingor';
    case 'Burton':
      return 'Burton Albion';
    case 'Bærum':
      return 'Baerum';
    case 'Kieler SV Holstein':
      return 'Holstein Kiel';
    case 'Flekkerøy':
      return 'Flekkeroy';
    case 'Baerum Sportsklubb':
      return 'Baerum';
    case 'IVärnamo':
      return 'Varnamo';
    case 'Villarreal II':
      return 'Villarreal B';
    case 'Guangzhou Evergrande':
      return 'Guangzhou';
    case 'IK Start Kristiansand':
      return 'IK Start';
    case 'Start':
      return 'IK Start';
    case 'BYoung Boys Bern':
      return 'Young Boys';
    case 'Wolves':
      return 'Wolverhampton';
    case 'Vejle BK':
      return 'Vejle';
    case 'Valerenga Oslo':
      return 'Valerenga';
    case 'IF Brommapojkarna':
      return 'Brommapojkarna';
    case 'Hradec Králové':
      return 'Hradec Kralove';
    case 'Granada 74':
      return 'Granada';
    case 'Ferencvárosi TC Budapest':
      return 'Ferencvaros';
    case 'Deportes Copiapó':
      return 'Deportes Copiapo';
    case 'Brighton Hove Albion':
      return 'Brighton';
    case 'Fylkir Reykjavik':
      return 'Fylkir';
    case 'GD Estoril Praia':
      return 'Estoril';
    case 'Exeter':
      return 'Exeter City';
    case 'Everton Liverpool':
      return 'Everton';
    case 'Cercle Brugge KSV':
      return 'Cercle Brugge';
    case 'Bradford':
      return 'Bradford City';
    case 'Bohemians 1905':
      return 'Bohemians';
    case 'Bohemians 1905 Praha':
      return 'Bohemians';
    case 'Barrow AFC':
      return 'Barrow';
    case 'Cardiff':
      return 'Cardiff City';
    case 'Ath Bilbao':
      return 'Athletic Bilbao';
    case 'Aberystwyth':
      return 'Aberystwyth Town';
    case 'Racing Club Strasbourg':
      return 'Strasbourg';
    case 'Radnički Niš':
      return 'Radnicki NIS';
    case 'PSV Eindhoven (jun.)':
      return 'PSV Reserves';
    case 'Lommel SK':
      return 'Lommel';
    case 'Linfield Belfast':
      return 'Linfield';
    case 'Fortuna Düsseldorf':
      return 'Fortuna Dusseldorf';
    case 'Dusseldorf':
      return 'Fortuna Dusseldorf';
    case 'Dijon Football Cote d´Or':
      return 'Dijon';
    case 'Puskás AFC':
      return 'Puskas Academy';
    case 'R. Charleroi':
      return 'Charleroi';
    case 'AWimbledon':
      return 'Wimbledon';
    case 'REspanyol':
      return 'Espanyol';
    case 'VVV Venlo':
      return 'VVV';
    case 'Borussia M.gladbach':
      return 'Borussia Monchengladbach';
    case 'Borussia M\'gladbach':
      return 'Borussia Monchengladbach';
    case 'Athletic Club Bilbao':
      return 'Athletic Bilbao';
    case 'Al Ittihad':
      return 'Al Ittihad Jeddah';
    case 'Ajax Amsterdam (jun.)':
      return 'Ajax Reserves';
    case 'Royal Antwerp':
      return 'Antwerp';
    case 'Real Oviedo':
      return 'Oviedo';
    case 'Qizilqum Zarafshon':
      return 'Qizilqum';
    case 'R. Oviedo':
      return 'Oviedo';
    case 'Ceilândia':
      return 'Ceilandia';
    case 'AD Guanacasteca':
      return 'Guanacasteca';
    case 'Korea Republic':
      return 'South Korea';
    case 'Slough':
      return 'Slough Town';
    case 'Chesham':
      return 'Chesham United';
    case 'Rep of Ireland':
      return 'Ireland';
    case 'Rep. Of Ireland':
      return 'Ireland';
    case 'Breiðablik':
      return 'Breidablik';
    case 'US Pontedera':
      return 'Pontedera';
    case 'Quilmes AC':
      return 'Quilmes';
    case 'SD Eibar':
      return 'Eibar';
    case 'Londrina EC':
      return 'Londrina';
    case 'Wexford Youths':
      return 'Wexford';
    case 'Bosnia Herzegovina':
      return 'Bosnia';
    case 'Bosnia-Herzegovina':
      return 'Bosnia';
    case 'Bosnia and Herzegovina':
      return 'Bosnia';
    case 'Bosnia & Herzegovina':
      return 'Bosnia';
    case 'Bačka Topola':
      return 'Backa Topola';
    case 'TBacka Topola':
      return 'Backa Topola';
    case 'Sporting':
      return 'Sporting Lisbon';
    case 'Raków Częstochowa':
      return 'Rakow Czestochowa';
    case 'Olympique Marseille':
      return 'Marseille';
    case 'Olympique de Marseille':
      return 'Marseille';
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
    case 'Colón':
      return 'Colon';
    case 'NBreda':
      return 'Breda';
    case 'Coritiba FBC':
      return 'Coritiba';
    case 'Domžale':
      return 'Domzale';
    case 'AZ Alkmaar (jun.)':
      return 'AZ Reserves';
    case 'Wisła Kraków':
      return 'Wisła Krakow';
    case 'Waterford United':
      return 'Waterford';
    case 'Vysočina Jihlava':
      return 'Jihlava';
    case 'Utrecht (jun.)':
      return 'Utrecht Reserves';
    case 'Union St. Gilloise':
      return 'Union SG';
    case 'Union Saint Gilloise':
      return 'Union SG';
    case 'Tranmere Rovers':
      return 'Tranmere';
    case 'SønderjyskE':
      return 'Sonderjyske';
    case 'SonderjyskE':
      return 'Sonderjyske';
    case 'Glentoran Belfast':
      return 'Glentoran';
    case 'Dunfermline Athletic':
      return 'Dunfermline';
    case 'Chelsea London':
      return 'Chelsea';
    case 'Celta Vigo':
      return 'Celta';
    case 'Bodø / Glimt':
      return 'Bodo/Glimt';
    case 'Barry Town United':
      return 'Barry Town';
    case 'Barry':
      return 'Barry Town';
    case 'SonderjyskE Haderslev':
      return 'Sonderjyske';
    case 'Shanghai SIPG':
      return 'Shanghai Port';
    case 'Shamrock Rovers':
      return 'Shamrock';
    case 'Newport':
      return 'Newport County';
    case 'NAC Breda':
      return 'Breda';
    case 'G.A. Eagles':
      return 'Go Ahead Eagles';
    case 'GO Ahead Eagles':
      return 'Go Ahead Eagles';
    case 'Le Havre AC':
      return 'Le Havre';
    case 'Bohemians Dublin':
      return 'Bohemians';
    case 'Al Gharafa SC':
      return 'Al Gharafa';
    case 'Al Fateh SC':
      return 'Al Fateh';
    case 'Gimna \' Plata':
      return 'Gimnasia La Plata';
    case 'Perak FA':
      return 'Perak';
    case 'LD Alajuelense':
      return 'Alajuelense';
    case 'Racing Club':
      return 'Racing Montevideo';
    case 'Racing Club Montevideo':
      return 'Racing Montevideo';
    case 'Racing Club de Montevideo':
      return 'Racing Montevideo';
    case 'KF Partizani Tirana':
      return 'Partizani Tirana';
    case 'Partizani':
      return 'Partizani Tirana';
    case 'Goiás Esporte Clube':
      return 'Goias';
    case 'Gimnasia L.P.':
      return 'Gimnasia La Plata';
    case 'Gimnasia LP':
      return 'Gimnasia La Plata';
    case 'Cruzeiro Esporte Clube':
      return 'Cruzeiro';
    case 'Colon Santa Fe':
      return 'Colon';
    case 'Bahia Salvador':
      return 'Bahia';
    case 'Atletico GO':
      return 'Atletico Goianiense';
    case 'Atlético Goianiense':
      return 'Atletico Goianiense';
    case 'América Mineiro':
      return 'America Mineiro';
    case 'America MG':
      return 'America Mineiro';
    case 'Al-Nasr Dubai SC':
      return 'Al-Nasr';
    case 'ACSM Politehnica Iasi':
      return 'Poli Iasi';
    case 'CSM Politehnica Iasi':
      return 'Poli Iasi';
    case 'CSM Iaşi':
      return 'Poli Iasi';
    case 'CSMS Iaşi':
      return 'Poli Iasi';
    case 'SSV Jeddeloh':
      return 'Jeddeloh';
    case 'Zrinjski':
      return 'Zrinjski Mostar';
    case 'HŠK Zrinjski Mostar':
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
    case 'Sheff Utd':
      return 'Sheff Utd';
    case 'West Bromwich':
      return 'West Brom';
    case 'OGC Nice':
      return 'Nice';
    case 'TNS':
      return 'The New Saints';
    case 'Zenit St. Petersburg':
      return 'Zenit';
    case 'Red Bull Salzbourg':
      return 'Salzbourg';
    case 'T1899 Hoffenheim':
      return 'Hoffenheim';
    case 'VfL Wolfsbourg':
      return 'Wolfsburg';
    case 'Hertha BSC II':
      return 'Hertha Berlin II';
    case 'Sheffield Utd':
      return 'Sheff Utd';
    case "Tala'ea El Gaish":
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
    case 'Koln':
      return 'Cologne';
    case 'MTK':
      return 'MTK Budapest';
    case 'MTK Hungaria':
      return 'MTK Budapest';
    case 'KVC Westerlo':
      return 'Westerlo';
    case 'Athletic Club':
      return 'Athletic Bilbao';
    case 'Anorthosis Famag':
      return 'Anorthosis';
    case 'Al-Riffa':
      return 'Al Riffa';
    case 'AZ Alkmaar (Yout':
      return 'AZ Reserves';
    case 'Podbeskidzie Bielsko Biala':
      return 'Podbeskidzie';
    case 'Winchester City':
      return 'Winchester';
    case 'Torquay United':
      return 'Torquay';
    case 'Shrewsbury Town':
      return 'Shrewsbury';
    case 'Shakhtar Done':
      return 'Shakhtar Donetsk';
    case 'Podbeskidzie Bie':
      return 'Podbeskidzie';
    case 'Podbeskidzie Bielsko-Biala':
      return 'Podbeskidzie';
    case 'SS Lazio Roma':
      return 'Lazio';
    case 'Crawley':
      return 'Crawley Town';
    case 'Colchester Unite':
      return 'Colchester';
    case 'Colchester United':
      return 'Colchester';
    case 'Cherno More Varna':
      return 'Cherno More';
    case 'Dender EH':
      return 'Dender';
    case 'Aalesunds':
      return 'Aalesund';
    case 'Royal Knokke':
      return 'Knokke';
    case 'SpVgg Unterhaching':
      return 'Unterhaching';
    case 'Köln':
      return 'Cologne';
    case 'Stal Brzeg':
      return 'Brzeg';
    case 'Greenock Morton':
      return 'Morton';
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
    case 'B36 Torshavn':
      return 'B36';
    case 'Grasshoper':
      return 'Grasshopers';
    case 'Pumas UNAM':
      return 'Unam Pumas';
    case 'Rosenborg BK Trondheim':
      return 'Rosenborg';
    case 'Persita Tangerang':
      return 'Persita';
    case 'Persija Jakarta':
      return 'Persija';
    case 'Paide Linnameeskond':
      return 'Paide';
    case 'PAOK Thessaloniki':
      return 'PAOK';
    case 'PAOK Salonika':
      return 'PAOK';
    case 'P.A.O.K.':
      return 'PAOK';
    case 'Kőln':
      return 'Cologne';
    case 'Oud-Heverlee Leuven':
      return 'Leuven';
    case 'OH Leuven':
      return 'Leuven';
    case 'Karlsruher SC':
      return 'Karlsruher';
    case 'Heidenheim 1846':
      return 'Heidenheim';
    case 'Grasshoppers Zürich':
      return 'Grasshopers';
    case 'FCV Dender EH':
      return 'Dender';
    case 'Fenerbahçe SK':
      return 'Fenerbahçe';
    case 'Excelsior Rotterdam':
      return 'Excelsior';
    case 'Aalesund FK':
      return 'Aalesund';
    case 'Arda':
      return 'Arda Kardzhali';
    case 'Albacete Balompie':
      return 'Albacete';
    case 'Paris Saint Germain':
      return 'PSG';
    case 'Paris SG':
      return 'PSG';
    case 'ESTTroyes':
      return 'Troyes';
    case 'Preston North End':
      return 'Preston';
    case 'Preston North En':
      return 'Preston';
    case 'Ternana Calcio':
      return 'Ternana';
    case 'Glasgow Rangers':
      return 'Rangers';
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
    case 'SL Benfica Lisboa':
      return 'Benfica';
    case 'Hamburger SV':
      return 'Hamburg';
    case 'SC Cambuur':
      return 'Cambuur';
    case 'Liefering Salzburg':
      return 'Liefering';
    case 'TSG 1899 Hoffenheim':
      return 'Hoffenheim';
    case 'Pyunik Yerevan':
      return 'Pyunik';
    case 'Zalaegerszegi TE':
      return 'Zalaegerszegi';
    case 'SC Paderborn 07':
      return 'Paderborn';
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
    case 'Havant & W':
      return 'Havant';
    case 'Havant & Waterlooville':
      return 'Havant';
    case 'Havant Waterloov':
      return 'Havant';
    case 'Feyenoord Rotterdam':
      return 'Feyenoord';
    case 'BYoung Boys':
      return 'Young Boys';
    case 'Atletico PR':
      return 'Athletico Paranaense';
    case 'Stoke':
      return 'Stoke City';
    case 'Stockport County':
      return 'Stockport';
    case 'PSV Eidhoven':
      return 'PSV';
    case 'Man United':
      return 'Manchester United';
    case 'Mansfield Town':
      return 'Mansfield';
    case 'Crewe Alexandra':
      return 'Crewe';
    case 'Cheltenham Town':
      return 'Cheltenham';
    case 'Carlisle United':
      return 'Carlisle';
    case 'Sassuolo Calcio':
      return 'Sassuolo';
    case 'Doncaster Rovers':
      return 'Doncaster';
    case 'SV Darmstadt 98':
      return 'Darmstadt';
    case 'SK Brann Bergen':
      return 'SK Brann';
    case 'Peterborough United':
      return 'Peterborough';
    case 'Man City':
      return 'Manchester City';
    case 'Helsingborgs':
      return 'Helsingborg';
    case 'GAIS Göteborg':
      return 'GAIS';
    case 'Inter Milano':
      return 'Inter';
    case 'Landskrona BoIS':
      return 'Landskrona';
    case 'RC Lens':
      return 'Lens';
    case 'SSC Napoli':
      return 'Napoli';
    case 'FC Salzburg':
      return 'Salzburg';
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
    case 'Monchengladbach':
      return 'Borussia Monchengladbach';
    case 'Mönchengladbach':
      return 'Borussia Monchengladbach';
    case 'Borussia Mönchengladbach':
      return 'Borussia Monchengladbach';
    case 'Real Madrid CF':
      return 'Real Madrid';
    case 'FC Bayern Munich':
      return 'Bayern Munich';
    case 'Retrô':
      return 'Retro';
    case 'Trenčín':
      return 'Trencin';
    case 'Ústí nad Labem':
      return 'Usti nad Labem';
    case 'Shakhtyor':
      return 'Shakhtyor Soligorsk';
    case 'Shakhter Soligor':
      return 'Shakhtyor Soligorsk';
    case 'Sepsi OSK Sfantu Gheorghe':
      return 'Sepsi';
    case 'SV Ried':
      return 'Ried';
    case 'Riffa':
      return 'Al Riffa';
    case 'Riffa SC':
      return 'Al Riffa';
    case 'NAC Breda':
      return 'Breda';
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
    case 'Zenit St. Peters':
      return 'Zenit';
    case 'Zenit Saint Petersburg':
      return 'Zenit';
    case 'Zawisza Bydgoszc':
      return 'Zawisza';
    case 'Zawisza Bydgoszcz':
      return 'Zawisza';
    case 'Wingate Finchley':
      return 'Wingate & Finchley';
    case 'VfL Wolfsburg':
      return 'Wolfsburg';
    case 'Salford City':
      return 'Salford';
    case 'RAAL La Louvière':
      return 'RAAL La Louviere';
    case 'Partick':
      return 'Partick Thistle';
    case 'Manisa FK':
      return 'Manisa';
    case 'Manisa BBSK':
      return 'Manisa';
    case 'Bologna 1909':
      return 'Bologna';
    case 'Arminia Bielefel':
      return 'Arminia Bielefeld';
    case 'Bielefeld':
      return 'Arminia Bielefeld';
    case '08 Homburg':
      return 'Homburg';
    case 'El Daklyeh':
      return 'El Dakhleya';
    case 'Huracán':
      return 'Huracan';
    case 'Ishøj':
      return 'Ishoj';
    case 'Persebaya Surabaya':
      return 'Persebaya';
    case 'Goias Esporte Clube':
      return 'Goias';
    case 'Goiás':
      return 'Goias';
    case 'Viimsi MRJK':
      return 'Viimsi';
    case 'UD Logrones':
      return 'Logrones';
    case 'UD Logroñés':
      return 'Logrones';
    case 'Logroñés':
      return 'Logrones';
    case 'Rostov FK':
      return 'Rostov';
    case 'Rheindorf Altach':
      return 'Altach';
    case 'SCR Altach':
      return 'Altach';
    case 'NEC Nijmegen':
      return 'NEC';
    case 'NNijmegen':
      return 'NEC';
    case 'Triglav Kranj':
      return 'Triglav';
    case 'HGorica':
      return 'Gorica';
    case 'Austria Wien':
      return 'Austria Vienna';
    case 'HNK Gorica':
      return 'Gorica';
    case 'Sheff United':
      return 'Sheff Utd';
    case 'Yeovil Town':
      return 'Yeovil';
    case 'Wolfsberger AC':
      return 'Wolfsberger';
    case 'WSwarovski Tirol':
      return 'Tirol';
    case 'VfL 1899 Osnabruck':
      return 'Osnabruck';
    case 'Tigres de la UANL':
      return 'Tigres';
    case 'Tigres UANL':
      return 'Tigres';
    case 'Swindon Town':
      return 'Swindon';
    case 'Nuremberg':
      return 'Nurnberg';
    case 'Salernitana 1919':
      return 'Salernitana';
    case 'RSB Berkane':
      return 'RS Berkane';
    case 'MOL Fehervar':
      return 'Fehervar';
    case 'Lausanne Sport':
      return 'Lausanne';
    case 'Lausanne-Sport':
      return 'Lausanne';
    case 'HNK Hajduk Split':
      return 'Hajduk Split';
    case 'Botafogo Ribeirao Preto':
      return 'Botafogo';
    case 'Botafogo-SP':
      return 'Botafogo';
    case 'Al-Nassr':
      return 'Al Nassr';
    case 'AE Kifisias':
      return 'Kifisias';
    case 'AE Kifisia':
      return 'Kifisias';
    case 'Kifisia':
      return 'Kifisias';
    case 'KMSK Deinze':
      return 'Deinze';
    case 'Dukla Prague':
      return 'Dukla';
    case 'Dukla Praha':
      return 'Dukla';
    case 'ACR Messina':
      return 'Messina';
    case 'Varaždin':
      return 'Varazdin';
    case 'Panaitolikos':
      return 'Panetolikos';
    case 'MSK Zilina':
      return 'Zilina';
    case 'M Karvina':
      return 'Karvina';
    case 'RC Strasbourg':
      return 'Strasbourg';
    case 'PZwolle':
      return 'Zwolle';
    case 'Sporting Charleroi':
      return 'Charleroi';
    case 'Žilina':
      return 'Zilina';
    case 'VPS Vaasa':
      return 'VPS';
    case 'Teuta Durrës':
      return 'Teuta Durres';
    case 'Slavia Praha':
      return 'Slavia Prague';
    case 'Royale Union Saint-Gilloise':
      return 'Union SG';
    case 'Rakow Czestochowa':
      return 'Rakow';
    case 'Paksi SE':
      return 'Paksi';
    case 'Paks':
      return 'Paksi';
    case 'PGiannina':
      return 'Giannina';
    case 'Pas Giannina':
      return 'Giannina';
    case 'Nordsjælland':
      return 'Nordsjaelland';
    case 'Newcastle United Jets':
      return 'Newcastle Jets';
    case 'Nakhon Pathom United':
      return 'Nakhon Pathom';
    case 'NK Varazdin':
      return 'Varazdin';
    case 'Luzern':
      return 'Lucerne';
    case 'N.E.C.':
      return 'NEC';
    case 'Nijmegen':
      return 'NEC';
    case 'AHermannstadt':
      return 'Hermannstadt';
    case 'HNK Sibenik':
      return 'Sibenik';
    case 'Šibenik':
      return 'Sibenik';
    case 'Napredak Kruševac':
      return 'Napredak';
    case 'INorrkoping':
      return 'Norrkoping';
    case 'HJK':
      return 'HJK Helsinki';
    case 'Ferencvarosi':
      return 'Ferencvaros';
    case 'Karabakh':
      return 'Qarabag';
    case 'New Eng. Revolution':
      return 'New England Revolution';
    case 'New England Revo':
      return 'New England Revolution';
    case 'Nafta Lendava':
      return 'Nafta';
    case 'Hougang United F':
      return 'Hougang United';
    case 'Karabakh Agdam':
      return 'Qarabag';
    case 'Cukaricki Stanko':
      return 'Cukaricki';
    case 'Betis':
      return 'Real Betis';
    case 'BK Häcken':
      return 'BK Hacken';
    case 'Häcken':
      return 'BK Hacken';
    case 'Astana-64':
      return 'Astana';
    case 'Al-Riyadh':
      return 'Al Riyadh';
    case 'Odeva Lipany':
      return 'Lipany';
    case 'Strumska slava':
      return 'Strumska Slava';
    case 'Al Najma Manama':
      return 'Al Najma';
    case 'Zamalek SC':
      return 'Zamalek';
    case 'Saint Mirren':
      return 'St. Mirren';
    case 'Red Bull Salzbur':
      return 'Salzburg';
    case 'Salzbourg':
      return 'Salzburg';
    case 'R. Rzeszow':
      return 'Resovia Rzeszow';
    case 'Resovia Rzeszów':
      return 'Resovia Rzeszow';
    case 'Polokwane':
      return 'Polokwane City';
    case 'NK Osijek':
      return 'Osijek';
    case 'Al-Muharraq':
      return 'Muharraq';
    case 'Bangkok United F':
      return 'Bangkok United';
    case 'Bangkok United (Tha)':
      return 'Bangkok United';
    case 'Bali United (Ina)':
      return 'Bali United';
    case 'Atalanta':
      return 'Atlanta United';
    case 'Akritas Chlorakas':
      return 'Akritas';
    case 'I Norrkoping':
      return 'Norrkoping';
    case 'Nõmme United':
      return 'Nomme United';
    case 'Norrköping':
      return 'Norrkoping';
    case 'Cancún':
      return 'Cancun';
    case 'Napredak Krus':
      return 'Napredak';
    case 'Fužinar':
      return 'Fuzinar';
    case 'Turon Yaypan':
      return 'Turon';
    case 'Sloboda Uzice':
      return 'Sloboda';
    case 'NK Olimpija Ljub':
      return 'Olimpija Ljubljana';
    case 'NK Odranci':
      return 'Odranci';
    case 'NK Fuzinar':
      return 'Fuzinar';
    case 'ND Gorica':
      return 'Gorica';
    case 'Metalac Gornji Milanovac':
      return 'Metalac';
    case 'Metalac GM':
      return 'Metalac';
    case 'La Chaux-De-Fond':
      return 'La Chaux-De-Fonds';
    case 'Hanau 93':
      return 'Hanau';
    case 'HSK Zrinjski Mos':
      return 'Zrinjski Mostar';
    case 'Graficar Beograd':
      return 'Graficar';
    case 'Grafičar':
      return 'Graficar';
    case 'Atlético Sanluqueño':
      return 'Atletico Sanluqueno';
    case 'Paderborn 07 II':
      return 'Paderborn II';
    case 'Fenix':
      return 'Atletico Fenix Montevideo';
    case 'Atletico Fenix Mon..':
      return 'Atletico Fenix Montevideo';
    case 'FYR Macedonia':
      return 'North Macedonia';
    case 'Alania Vladikavk':
      return 'Alania Vladikavkaz';
    case 'CRB Maceio':
      return 'CRB';
    case 'Independiente Petroleros':
      return 'Independiente Petrolero';
    case 'Reims Sainte-Anne':
      return 'Reims St-Anne';
    case 'Pontypridd Town AFC':
      return 'Pontypridd';
    case 'Pontypridd Town':
      return 'Pontypridd';
    case 'Platense Municipal':
      return 'Platense';
    case 'Pen-y-Bont':
      return 'Penybont';
    case 'Libertad':
      return 'Libertad Gran Mamore';
    case 'Libertad Gran Ma':
      return 'Libertad Gran Mamore';
    case 'Guarani Campinas':
      return 'Guarani';
    case 'Connahs Q.':
      return 'Connahs Quay';
    case 'Connahs Quay Tow':
      return 'Connahs Quay';
    case 'GAP Connah S Quay':
      return 'Connahs Quay';
    case 'Gap Connah\'s Quay':
      return 'Connahs Quay';
    case 'Connah\'s Quay':
      return 'Connahs Quay';
    case 'Connah\'s Quay Nomads':
      return 'Connahs Quay';
    case 'Cobán Imperial':
      return 'Coban Imperial';
    case 'Bosnia-Herzegovi':
      return 'Bosnia';
    case 'Alsterbrüder':
      return 'Alsterbruder';
    case 'Caernarfon Town':
      return 'Caernarfon';
    case 'Albion Rovers':
      return 'Albion Montevideo';
    case 'Eastbourne Borou':
      return 'Eastbourne';
    case 'Eastbourne Borough':
      return 'Eastbourne';
    case 'Eastbourne Boro':
      return 'Eastbourne';
    case 'PSochi':
      return 'Sochi';
    case 'Excelsior Maassl':
      return 'Excelsior Maassluis';
    case 'Dynamo Ceske Bud':
      return 'Ceske Budejovice';
    case 'Cape Verde Islands':
      return 'Cape Verde';
    case 'Šamorín':
      return 'Samorin';
    case 'Tepatitlán':
      return 'Tepatitlan';
    case 'SK Sigma Olomouc':
      return 'Sigma Olomouc';
    case 'Peñarol':
      return 'Penarol';
    case 'MC Oran':
      return 'Oran';
    case 'Churchill Brothers SC':
      return 'Churchill Brothers';
    case 'Bangor 1876':
      return 'Bangor City';
    case 'Virgin Islands, U.s.':
      return 'US Virgin Islands';
    case 'Saint Kitts and Nevis':
      return 'St Kitts Nevis';
    case 'STK Samorin':
      return 'Samorin';
    case 'NK Šmartno':
      return 'NK Smartno';
    case 'Lyn Oslo':
      return 'Lyn';
    case 'Dongu':
      return 'Deportivo Dongu';
    case 'DR Congo':
      return 'Congo DR';
    case 'Cray Valley (PM)':
      return 'Cray Valley';
    case 'Cray Valley PM':
      return 'Cray Valley';
    case 'Cray Valley Pape':
      return 'Cray Valley';
    case 'Chamois Niort':
      return 'Niort';
    case 'Vasco da Gama':
      return 'Vasco';
    case 'Vasco DA Gama':
      return 'Vasco';
    case 'Ümraniyespor':
      return 'Umraniyespor';
    case 'York City':
      return 'York';
    case 'Racing Club Mont':
      return 'Racing Montevideo';
    case 'Poole Town':
      return 'Poole';
    case 'Morpeth Town':
      return 'Morpeth';
    case 'Hungerford Town':
      return 'Hungerford';
    case 'Concord Rangers':
      return 'Concord';
    case 'Canvey Island':
      return 'Canvey';
    case 'Oss':
      return 'Top Oss';
    case 'OSS':
      return 'Top Oss';
    case 'Jong Ajax Amsterdam':
      return 'Ajax Reserves';
    case 'IGoteborg':
      return 'Goteborg';
    case 'Brøndby':
      return 'Brondby';
    case 'Accrington Stanl':
      return 'Accrington';
    case 'Accrington Stanley':
      return 'Accrington';
    case 'Monopoli Calcio':
      return 'Monopoli';
    case 'Pineto Calcio':
      return 'Pineto';
    case 'Nacional Potosí':
      return 'Nacional Potosi';
    case 'Dinamo Brest':
      return 'Dynamo Brest';
    case 'Real Zaragoza':
      return 'Zaragoza';
    case 'Hillerod Fodbold':
      return 'Hillerod';
    case 'Gaziantep BB':
      return 'Gaziantep';
    case 'Gazişehir Gaziantep':
      return 'Gaziantep';
    case 'Bkma Yerevan':
      return 'BKMA';
    case 'Aalesunds FK':
      return 'Aalesunds';
    case 'Mantova 1911':
      return 'Mantova';
    case 'Sutjeska Niksic':
      return 'Sutjeska';
    case 'IL Hodd':
      return 'Hodd';
    case 'Motala AIF FK':
      return 'Motala';
    case 'Motala AIF':
      return 'Motala';
    case 'MKarvina':
      return 'Karvina';
    case 'Levadia':
      return 'Levadia Tallinn';
    case 'Kristiansund BK':
      return 'Kristiansund';
    case 'Kisvárda':
      return 'Kisvarda';
    case 'Kidderminster Harriers':
      return 'Kidderminster';
    case 'Dragón':
      return 'Dragon';
    case 'Karlsruhe':
      return 'Karlsruher';
    case 'KFUM Oslo':
      return 'KFUM';
    case 'Istra 196Pula':
      return 'Istra';
    case 'Ismaily SC':
      return 'Ismaily';
    case 'Gokulam Kerala':
      return 'Gokulam';
    case 'Fortaleza CE':
      return 'Fortaleza';
    case 'Fortaleza EC':
      return 'Fortaleza';
    case 'Casertana 1908':
      return 'Casertana';
    case 'Casa Pia AC':
      return 'Casa Pia';
    case 'Casa Pia Atletico':
      return 'Casa Pia';
    case 'CSR Altach':
      return 'Altach';
    case 'SK Brann':
      return 'Brann';
    case 'Al Mokawloon Al Arab':
      return 'Al Mokawloon';
    case 'Guaireña':
      return 'Guaireтa';
    case 'Beroe Stara Zagora':
      return 'Beroe';
    case 'Utsiktens BK':
      return 'NEC';
    case 'Dijon O':
      return 'Dijon';
    case 'St. Truiden':
      return 'St Truiden';
    case 'Səbail':
      return 'Sabail';
    case 'AL Gharafa':
      return 'AL Gharafa';
    case 'Al Ahli SC':
      return 'Al Ahli Doha';
    case 'Wiener Sport-Club':
      return 'Wiener';
    case 'Wiener SC':
      return 'Wiener';
    case 'Wiener SK':
      return 'Wiener';
    case 'UD Las Palmas':
      return 'Las Palmas';
    case 'Venlo':
      return 'VVV';
    case 'St. Truiden':
      return 'St Truiden';
    case 'Hlučín':
      return 'Hlucin';
    case 'Smouha SC':
      return 'Smouha';
    case 'SV Darmstadt 1898':
      return 'Darmstadt';
    case 'SV 07 Elversberg':
      return 'Elversberg';
    case 'SK Hranice':
      return 'Hranice';
    case 'Mohammedan SC':
      return 'Mohammedan';
    case 'Košice':
      return 'Kosice';
    case 'Emirates Club':
      return 'Emirates';
    case 'Bohemian':
      return 'Bohemians';
    case 'Deutschlandsberger SC':
      return 'Deutschlandsberger';
    case 'Buderich 02':
      return 'Buderich';
    case 'Al Ahli Doha SC':
      return 'Al Ahli Doha';
    case 'Admira Wacker':
      return 'Admira';
    case 'Persepolis Tehran':
      return 'Persepolis';
    case 'Din. Minsk':
      return 'Dinamo Minsk';
    case 'Cuiabá':
      return 'Cuiaba';
    case 'TOP Oss':
      return 'Top Oss';
    case 'Pusamania Borneo':
      return 'Borneo';
    case 'Al Mu\'aidar':
      return 'Muaither';
    case 'Viimsi Igiliikur':
      return 'Viimsi';
    case 'Gaziantep FK':
      return 'Gaziantep';
    case 'Gazisehir Gaziantep FK':
      return 'Gaziantep';
    case 'Cracovia':
      return 'Cracovia Krakow';
    case 'Cracovia Kraków':
      return 'Cracovia Krakow';
    case 'Cambuur Leeuwaar':
      return 'Cambuur';
    case 'Al-Mu\'aidar':
      return 'Muaither';
    case 'Al Naser':
      return 'Al Nasr';
    case 'Al Nasar':
      return 'Al Nasr';
    case 'AL Duhail SC':
      return 'Al Duhail';
    case 'Viktoria Koln':
      return 'Viktoria Cologne';
    case 'Viktoria koln':
      return 'Viktoria Cologne';
    case 'Turégano':
      return 'Turegano';
    case 'Vasas SC':
      return 'Vasas';
    case 'St. Polten':
      return 'St Polten';
    case 'Quintanar de la Orden':
      return 'Quintanar';
    case 'Patro Eisden Maasmechelen':
      return 'Patro Eisden';
    case 'Nürnberg':
      return 'Nurnberg';
    case 'Saarbrücken':
      return 'Saarbrucken';
    case 'SKU Amstetten':
      return 'Amstetten';
    case 'Lierse K.':
      return 'Lierse';
    case 'Lausanne Sport':
      return 'Lausanne';
    case 'Etar 1924 Veliko Tarnovo':
      return 'Etar';
    case 'Corinthians Paulista':
      return 'Corinthians';
    case 'CSA Steaua Bucuresti':
      return 'CSA Steaua';
    case 'CSA Steaua Bucureşti':
      return 'CSA Steaua';
    case 'Bournemouth AFC':
      return 'Bournemouth';
    case 'Borussia Dortmun':
      return 'Borussia Dortmund';
    case 'Beerschot VA':
      return 'Beerschot';
    case 'Beerschot Wilrij':
      return 'Beerschot';
    case 'AB Copenhagen':
      return 'AB';
    case 'ABournemouth':
      return 'Bournemouth';
    case 'Lincoln City':
      return 'Lincoln';
    case 'Leoben DSV':
      return 'Leoben';
    case 'DSV Leoben':
      return 'Leoben';
    case 'DLeoben':
      return 'Leoben';
    case 'K.A.S. Eupen':
      return 'Eupen';
    case 'Hibernians':
      return 'Hibernian';
    case 'Kettering Town':
      return 'Kettering';
    case 'Gleisdorf 09':
      return 'Gleisdorf';
    case 'DArminia Bielefeld':
      return 'Arminia Bielefeld';
    case 'CP Cacereno':
      return 'Cacereno';
    case 'CA Talleres de Córdoba':
      return 'Talleres Cordoba';
    case 'National Bank SC':
      return 'National Bank of Egypt';
    case 'Saint-Etienne':
      return 'St Etienne';
    case 'Araz Nakhchivan':
      return 'Araz';
    case 'IK Junkeren':
      return 'Junkeren';
    case 'SK Brann II':
      return 'Brann 2';
    case 'I Goteborg':
      return 'IGoteborg';
    case 'Utrecht Reserves':
      return 'Jong Utrecht';
    case 'Utrecht (Yout':
      return 'Utrecht Reserves';
    case 'Sundsvall':
      return 'GIF Sundsvall';
    case 'St. Louis City SC':
      return 'St. Louis City';
    case 'Redditch United':
      return 'Redditch';
    case 'Othellos Athieno':
      return 'Othellos';
    case 'Othellos Athienou':
      return 'Othellos';
    case 'Orlando City SC':
      return 'Orlando City';
    case 'OFI':
      return 'OFI Crete';
    case 'Musselburgh Ath':
      return 'Musselburgh';
    case 'Musselburgh Athletic':
      return 'Musselburgh';
    case 'Lanús':
      return 'Lanus';
    case 'Cúcuta Deportivo':
      return 'Cucuta';
    case 'Brann II':
      return 'Brann 2';
    case 'Bognor Regis Town':
      return 'Bognor Regis';
    case 'Brattvåg':
      return 'Brattvag';
    case 'Bali United Pusam':
      return 'Bali United';
    case 'Araz-Naxçıvan':
      return 'Araz';
    case 'Araz FK':
      return 'Araz';
    case 'AGF':
      return 'Aarhus';
    case 'AEK':
      return 'AEK Athens';
    case 'Kongsvinger IL':
      return 'Kongsvinger';
    case 'AIK Fotboll':
      return 'AIK';
    case 'Stade Brestois':
      return 'Brest';
    case 'Sheffield Wednesday':
      return 'Sheff Wed';
    case 'Monza Calcio':
      return 'Monza';
    case 'Samgurali Tskhaltubo':
      return 'Samgurali';
    case 'Deportivo Toluca':
      return 'Toluca';
    case 'Montpellier HSC':
      return 'Montpellier';
    case 'Kieler Holstein':
      return 'Holstein Kiel';
    case 'Stade Rennais':
      return 'Rennes';
    case 'Sarpsborg 08':
      return 'Sarpsborg';
    case 'Omonia Nicosia F':
      return 'Omonia';
    case 'Mjallby AIF':
      return 'Mjallby';
    case 'Mjällby AIF':
      return 'Mjallby';
    case 'Mjällby':
      return 'Mjallby';
    case 'Lausanne Sport':
      return 'Lausanne';
    case 'KV Kortrijk':
      return 'Kortrijk';
    case 'KI Klaksvik':
      return 'Klaksvik';
    case 'Eintracht Frankf':
      return 'Eintracht Frankfurt';
    case 'Queen\'s Park Rangers':
      return 'QPR';
    case 'Real Mallorca':
      return 'Mallorca';
    case 'M Ruzomberok':
      return 'Ruzomberok';
    case 'Ružomberok':
      return 'Ruzomberok';
    case 'KEupen':
      return 'Eupen';
    case 'Salzbourg':
      return 'Salzburg';
    case 'Stade De Reims':
      return 'Reims';
    case 'Newells Old Boys':
      return 'Newells';
    case 'Nagoya Grampus Eight':
      return 'Nagoya Grampus';
    case 'Clermont Foot 63':
      return 'Clermont';
    case 'KF Erzeni':
      return 'Erzeni';
    case 'Erzeni Shijak':
      return 'Erzeni';
    case 'Hertha BBerlin':
      return 'Hertha Berlin';
    case 'Prostejov':
      return 'Podbrezova';
    case 'Sunderland A':
      return 'Sunderland';
    case 'Sittard':
      return 'Fortuna Sittard';
    case 'Muaither SC':
      return 'Muaither';
    case 'Levanger FK':
      return 'Levanger';
    case 'Inverness CT':
      return 'Inverness';
    case 'Yverdon':
      return 'Yverdon Sport';
    case 'Krylia Sovetov':
      return 'Krylya Sovetov';
    case 'Krylya Soveto':
      return 'Krylya Sovetov';
    case 'Hatta Club':
      return 'Hatta';
    case 'B 93 Copenhagen':
      return 'B 93';
    case 'Podbrezová':
      return 'Podbrezova';
    case 'Varbergs BoIS':
      return 'Varberg';
    case 'Stade de Reims':
      return 'Reims';
    case 'St. Pauli':
      return 'St Pauli';
    case 'Ranheim IL':
      return 'Ranheim';
    case 'Radnicki NIS':
      return 'Radnicki Nis';
    case 'Queen of South':
      return 'Queen of the South';
    case 'Persib Bandung':
      return 'Persib';
    case 'Ostersunds FK':
      return 'Ostersunds';
    case 'Newtown AFC':
      return 'Newtown';
    case 'GIL Vicente':
      return 'Gil Vicente';
    case 'Fakel Voronezh':
      return 'Fakel';
    case 'Dorchester Town':
      return 'Dorchester';
    case 'Buducnost Podgorica':
      return 'Buducnost';
    case 'Buducnost Pod':
      return 'Buducnost';
    case 'Borussia Monchen':
      return 'Borussia Monchengladbach';
    case 'Bayern Munchen':
      return 'Bayern Munich';
    case 'Ayr United':
      return 'Ayr';
    case 'Ayr United.':
      return 'Ayr';
    case 'Austria Klage':
      return 'Austria';
    case 'A. Klagenfurt':
      return 'Austria';
    case 'Austria Klagenfurt':
      return 'Austria';
    case 'SpVgg Greuther Furth':
      return 'Greuther Furth';
    case 'Rotherham':
      return 'Rotherham United';
    case 'Viborg FF':
      return 'Viborg';
    case 'Málaga':
      return 'Malaga';
    case 'Wisla PLock':
      return 'Wisla Plock';
    case 'WIL 1900':
      return 'Wil';
    case 'Wil 1900':
      return 'Wil';
    case 'Vysocina Jihlava':
      return 'Jihlava';
    case 'Vitesse Arnhem':
      return 'Vitesse';
    case 'VfL BOCHUM':
      return 'Bochum';
    case 'VfL Bochum':
      return 'Bochum';
    case 'St Patrick\'s Athletic':
      return 'St Patricks';
    case 'Slaven Koprivnica':
      return 'Slaven Belupo';
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
    case "Queen's Park":
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
    case 'Stevenage Borough':
      return 'Stevenage';
    case 'St. Gallen':
      return 'St Gallen';
    case 'Queen´s Park':
      return 'Queens Park';
    case 'Queens Park Rangers':
      return 'QPR';
    case 'Odd BK':
      return 'Odd';
    case 'Västeras SK':
      return 'Vasteras';
    case 'Västerås SK FK':
      return 'Vasteras';
    case 'Werder':
      return 'Werder Bremen';
    case 'Odd Grenland BK':
      return 'Odd';
    case 'Neman Grodno':
      return 'Neman';
    case 'Kecskemeti TE':
      return 'Kecskemeti';
    case 'Kecskeméti TE':
      return 'Kecskemeti';
    case 'Istanbul BFK':
      return 'Istanbul Basaksehir';
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
    case 'Ararat':
      return 'Ararat Yerevan';
    case 'Stutt. Kickers':
      return 'Stuttgarter Kickers';
    case 'Stabæk':
      return 'Stabaek';
    case 'WCasablanca':
      return 'Wydad Casablanca';
    case 'Sporting Gijón':
      return 'Sporting Gijon';
    case 'Crvena zvezda':
      return 'Crvena Zvezda';
    case 'Red Star Belgrade':
      return 'Crvena Zvezda';
    case 'Atlético de Madrid':
      return 'Atletico Madrid';
    case 'West Bromwich Albion':
      return 'West Brom';
    case 'Eyüpspor':
      return 'Eyupspor';
    case 'Preussen Münster':
      return 'Preussen Munster';
    case 'Leeds United':
      return 'Leeds';
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
    case 'Bolton':
      return 'Bolton Wanderers';
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
