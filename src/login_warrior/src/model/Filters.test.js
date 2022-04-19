import Filters from './Filters';


describe('Unit Testing Filters', () => {
    //Filters vuoto
    const filtersNull = new Filters();

    test('Getter Id vuoto', () => {
        expect(filtersNull.getId()).toBe(undefined);
    });
    test('Getter Ip vuoto', () => {
        expect(filtersNull.getIp()).toBe(undefined);
    });
    test('Getter Date vuoto', () => {
        expect(filtersNull.getDate()).toBe(undefined);
    });
    test('Getter Event vuoto', () => {
        expect(filtersNull.getEvent()).toBe(undefined);
    });
    test('Getter Application vuoto', () => {
        expect(filtersNull.getApplication()).toBe(undefined);
    });

    //Filters con parametri interi
    //Siccome gli attributi non hanno tipo allora è possibile usare qualsiasi tipo di dato
    const filtersIntero = new Filters(18682,18682,18682,18682,18682);

    test('Getter Id con primitiva errata', () => {
        expect(filtersIntero.getId()).toBe(18682);
    });
    test('Getter Ip con primitiva errata', () => {
        expect(filtersIntero.getIp()).toBe(18682);
    });
    test('Getter Date con primitiva errata', () => {
        expect(filtersIntero.getDate()).toBe(18682);
    });
    test('Getter Event con primitiva errata', () => {
        expect(filtersIntero.getEvent()).toBe(18682);
    });
    test('Getter Application con primitiva errata', () => {
        expect(filtersIntero.getApplication()).toBe(18682);
    });
    
    //Filters con dati
    const filters = new Filters("18682", "92.223.250.4" , new Date("2021-01-12 13:31:33.000"), "login" , "ERM" );

    //Getters
    test('Getter Id', () => {
        expect(filters.getId()).toBe("18682");
    });
    test('Getter Ip', () => {
        expect(filters.getIp()).toBe("92.223.250.4");
    });
    test('Getter Date', () => {
        expect(filters.getDate()).toStrictEqual(new Date("2021-01-12 13:31:33.000"));
    });
    test('Getter Event', () => {
        expect(filters.getEvent()).toBe("login");
    });
    test('Getter Application', () => {
        expect(filters.getApplication()).toBe("ERM");
    });

    //Filters con dati ma senza ip
    //Filters con dati
    const filtersNoIp = new Filters("18682", "" , new Date("2021-01-12 13:31:33.000"), "login" , "ERM" );

    test('Getter Id vuoto', () => {
        expect(filtersNoIp.getIp()).toBe("");
    });    
        
    //Setter
    test('Setter Id', () => {
        filters.setId("123");
        expect(filters.getId()).toBe("123");
    });
    test('Setter Ip', () => {
        filters.setIp("123.123.1.2");
        expect(filters.getIp()).toBe("123.123.1.2");
    });
    test('Setter Date', () => {
        filters.setDate(new Date("2020-04-12 15:31:33.000"));
        expect(filters.getDate()).toStrictEqual(new Date("2020-04-12 15:31:33.000"));
    });
    test('Setter Event', () => {
        filters.setEvent("logout");
        expect(filters.getEvent()).toBe("logout");
    });
    test('Setter Application', () => {
        filters.setApplication("HRM");
        expect(filters.getApplication()).toBe("HRM");
    });

    //Setter con dati vuoti
    test('Setter Id vuoto', () => {
        filters.setId("");
        expect(filters.getId()).toBe("");
    });
    test('Setter Ip vuoto', () => {
        filters.setIp("");
        expect(filters.getIp()).toBe("");
    });
    test('Setter Date vuoto', () => {
        filters.setDate("");
        expect(filters.getDate()).toBe("");
    });
    test('Setter Event vuoto', () => {
        filters.setEvent("");
        expect(filters.getEvent()).toBe("");
    });
    test('Setter Application vuoto', () => {
        filters.setApplication("");
        expect(filters.getApplication()).toBe("");
    });

    //Setter con tipi errati
    //Siccome gli attributi non hanno tipo allora è possibile usare qualsiasi tipo di dato
    test('Setter Id con primitiva errata', () => {
        filters.setId(18682);
        expect(filters.getId()).toBe(18682);
    });
    test('Setter Ip con primitiva errata', () => {
        filters.setIp(18682);
        expect(filters.getIp()).toBe(18682);
    });
    test('Setter Date con primitiva errata', () => {
        filters.setDate(18682);
        expect(filters.getDate()).toBe(18682);
    });
    test('Setter Event con primitiva errata', () => {
        filters.setEvent(18682);
        expect(filters.getEvent()).toBe(18682);
    });
    test('Setter Application con primitiva errata', () => {
        filters.setApplication(18682);
        expect(filters.getApplication()).toBe(18682);
    });
});