import CSV from './CSV.js';
import DataPoint from './DataPoint.js';

describe('Unit Testing CSV', () => {
    //CSV nullo
    const CSVVuoto = new CSV();
    test('Getter CSVText vuoto', () => {
      expect(CSVVuoto.getCsvText()).toBe(undefined);
    });

    //CSV come intero
    //Siccome gli attributi non hanno tipo allora è possibile usare qualsiasi tipo di dato
    const CSVNumerico = new CSV(18682);
    test('Getter CSVText con primitiva errata', () => {
      expect(CSVNumerico.getCsvText()).toBe(18682);
    });

    // !!! Inserie controllo sullo stato del CsvText prima di eseguire il parser !!!
    test('ParseCSV vuoto e getId()', () => {
        const dataPoint = CSVVuoto.parseCsv();
        expect( dataset[0].getId ).toBe(undefined);
    });

    //CSV con dati
    const CSVConDati = new CSV(`18682;128720058;2021-01-12 13:31:33.000;1;ERM;erm3zs02;92.223.250.4;"001       ";mecumzgtvw;pjnz16keg9
    18682;140520277;2021-03-13 15:00:18.000;1;ERM;erm3zs02;92.223.250.4;"001       ";crwredkmsn;i20drxb7tm`);
    test('Getter CSVTest con dati', () => {
      expect(CSVConDati.getCsvText()).toBe(`18682;128720058;2021-01-12 13:31:33.000;1;ERM;erm3zs02;92.223.250.4;"001       ";mecumzgtvw;pjnz16keg9
    18682;140520277;2021-03-13 15:00:18.000;1;ERM;erm3zs02;92.223.250.4;"001       ";crwredkmsn;i20drxb7tm`);
    });
    //Test ritorno del metodo ParseCSV
    test('ParseCSV con dati, primo DataPoint', () => {
        const dataPoint = CSVConDati.parseCsv();
        const result = new DataPoint("18682", "92.223.250.4" , new Date("2021-01-12 13:31:33.000"), "login" , "ERM" ); 
        expect( dataPoint[0] ).toStrictEqual(result);
    });
    test('ParseCSV con dati, secondo DataPoint', () => {
        const dataPoint = CSVConDati.parseCsv();
        const result = new DataPoint("18682", "92.223.250.4" , new Date("2021-03-13 15:00:18.000"), "login" , "ERM" ); 
        expect( dataPoint[1] ).toStrictEqual(result);
    });
    test('ParseCSV con evento 2', () => {
        const CSVEvento2 = new CSV('18682;128720058;2021-01-12 13:31:33.000;2;ERM;erm3zs02;92.223.250.4;"001";mecumzgtvw;pjnz16keg9;');
        const dataPoint = CSVEvento2.parseCsv();
        expect( dataPoint[0].getEvent() ).toBe("error");
    });
    test('ParseCSV con evento 3', () => {
        const CSVEvento3 = new CSV('18682;128720058;2021-01-12 13:31:33.000;3;ERM;erm3zs02;92.223.250.4;"001";mecumzgtvw;pjnz16keg9;');
        const dataPoint = CSVEvento3.parseCsv();
        expect( dataPoint[0].getEvent() ).toBe("logout");
    });
    //ParseCSV avendo un evento non valido
    test('ParseCSV con evento maggiore di 3', () => {
        const CSVErroreEvento = new CSV('18682;128720058;2021-01-12 13:31:33.000;4;ERM;erm3zs02;92.223.250.4;"001";mecumzgtvw;pjnz16keg9;');
        expect( () => {CSVErroreEvento.parseCsv()} ).toThrowError(new Error('Evento non riconosciuto'));
    });

  });
  