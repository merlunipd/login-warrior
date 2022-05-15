export default class ForceDirectedGraph1 {
    width = 1000;
    height = 600;
    spacing = 100;
    circlesRadius = 5;
    circlesRadiusGrowth = 6;
    circlesOpacity = 0.4;
    force;
    links;
    nodes;
    svg;

    createSvg() {
        this.svg = d3.select('#visualization')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .append('g')
            //.attr('transform', `translate(${this.spacing / 2},${this.spacing / 2})`);
    }

    createForce() {
        return d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) { return d.id; }))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(this.width / 2, this.height / 2))
    }


    parseDati(dataset){
        /*
        Illuminazione divina (da rifare con map al posto di array!)
        Reminder per il funzionamento:
            - nel controllo inserire l'index del nodo per facilità di recupero nella creazione dei link
            - aggiungere altre variabili di conta, che contano gli errori,login e logout degli orari e dei mesi, per facilitare il value dei link
            - possibilità di portare il parser fuori dalla classe!
        */   

        let nodes = [];
        let nodes2 = [];
        let links = [];

        //Variabili controllo presenza per creazione nodi, undefined se elemento non disponibile, valore dell'index altrimenti
        let controlloTipologia =[]; //1-login, 2-error, 3-logout
        let controlloOrario =[];    //1-orario d'ufficio, 2-orario non d'ufficio
        let controlloMese =[];  //indice = numero del mese - 1
        
        //Variabili conteggio per assegnazione al value di links
        let contaLoginOra = [0,0];
        let contaLoginMese = [0,0,0,0,0,0,0,0,0,0,0,0];
        let contaLogoutOra = [0,0];
        let contaLogoutMese = [0,0,0,0,0,0,0,0,0,0,0,0];
        let contaErrorOra = [0,0];
        let contaErrorMese = [0,0,0,0,0,0,0,0,0,0,0,0];

        let orario;
        //indice dei nodi
        let index = 0;




        

        /*let id1 = dataset[0].getId();
        let e1 = dataset[0].getEvent();
        let contaE1 = [0,0];
        if (e1 === "login") {
            contaE1[0]++;
        } else if (e1 === "error") {
            contaE1[1]++;
        }
        let id2;
        let e2;
        let ratio;


        //viene creato un nodo per ogni utente del dataset
        for (let i = 1; i < dataset.length; i++) {
            id2 = dataset[i].getId();
            if (id1 == id2) {
                e2 = dataset[i].getEvent();
                if (e2 === "login") {
                    contaE1[0]++;
                } else if (e2 === "error") {
                    contaE1[1]++;
                }
            } else {
                ratio = contaE1[1] ? contaE1[0]/(contaE1[0]+contaE1[1])*100 : 100;
                nodes.push({"id": id1, "ratio": ratio});
                id1 = id2;
                console.log(contaE1);
                contaE1 = [0,0];
            }
        }*/



        let id;
        let e;
        let log = 0;
        let err = 0;
        let ratio;
        let b = false;
        //console.log(dataset.length);
        for (let i = 0; i < dataset.length; i++) {
            id = dataset[i].getId();
            e = dataset[i].getEvent();
            //console.log(id + " " + e);
            for (let j = 0; j < nodes.length; j++) {
                /*console.log(id);
                console.log(nodes[j].id);*/
                if (id == nodes[j].id) {
                    b = true;
                    if (e === "login") {
                        nodes[j].login++;
                        //console.log(nodes[j].login)
                    } else if (e === "error") {
                        nodes[j].error++;
                    }
                    nodes[j].ratio = nodes[j].error ? nodes[j].login/(nodes[j].login+nodes[j].error)*100 : 100;
                }
            }
            if (!b) {
                log = 0; err = 0;
                if (e === "login") {
                    log++;
                } else if (e === "error") {
                    err++;
                }
                ratio = err ? 0 : 100;
                nodes.push({"id": id, "login": log, "error": err, "ratio": ratio});
            }
            b = false;

            //console.log(nodes.length);


            /*if (id1 == id2) {
                e2 = dataset[i].getEvent();
                if (e2 === "login") {
                    contaE1[0]++;
                } else if (e2 === "error") {
                    contaE1[1]++;
                }
            } else {
                ratio = contaE1[1] ? contaE1[0]/(contaE1[0]+contaE1[1])*100 : 100;
                nodes.push({"id": id1, "ratio": ratio});
                id1 = id2;
                console.log(contaE1);
                contaE1 = [0,0];
            }*/
        }

        for (let i = 0; i < 100; i++) {
            console.log(nodes[i].log);
            nodes2.push({"id": nodes[i].id, "login": nodes[i].login, "error": nodes[i].error, "ratio": nodes[i].ratio});
        }

        console.log(nodes2.length);
        console.log(nodes2);



        

        
        //Scorre tutti i dati e crea un nodo per ogni tipologia esistente, andando a contare i collegamenti con gli orari e i mesi
        /*for (let i = 0; i < dataset.length; i++) {
            orario = new Date(dataset[i].getDate());

            //Creazione nodi seconda colonna, login, errori, logout
            switch(dataset[i].getEvent()){
                case "login":
                    if( (typeof controlloTipologia[0]) == "undefined"){
                        //nodes.push({"id":index,"name":"login"});
                        controlloTipologia[0]=index;
                        index++;
                    }
                    orario.getHours() > 8 && orario.getHours() < 17 ? contaLoginOra[0]++ : contaLoginOra[1]++;
                    contaLoginMese[orario.getMonth()]++;
                    break;
                case "error":
                    if((typeof controlloTipologia[1]) == "undefined"){
                        //nodes.push({"id":index,"name":"error"});
                        controlloTipologia[1]=index;
                        index++;
                    }
                    orario.getHours() > 8 && orario.getHours() < 17 ? contaErrorOra[0]++ : contaErrorOra[1]++;
                    contaErrorMese[orario.getMonth()]++;
                    break;
                case "logout":
                    if((typeof controlloTipologia[2]) == "undefined"){
                        //nodes.push({"id":index,"name":"logout"});
                        controlloTipologia[2]=index;
                        index++;
                    }
                    orario.getHours() > 8 && orario.getHours() < 17 ? contaLogoutOra[0]++ : contaLogoutOra[1]++;
                    contaLogoutMese[orario.getMonth()]++;
                    break;
                default:
                    throw new Error("Tipologia non valida");
            }

            

            //Creazione nodi prima colonna, orario d'ufficio e orario non d'ufficio
            if(orario.getHours() >= 8 && orario.getHours() <= 17 && (typeof controlloOrario[0]) == "undefined"){
                //nodes.push({"id":index,"name":"orario d'ufficio"});
                controlloOrario[0]=index;
                index++;
            }else if( (typeof controlloOrario[1]) == "undefined" && ((orario.getHours() >= 0 && orario.getHours() <= 7) || (orario.getHours() >= 18 && orario.getHours() <= 24))){
                //nodes.push({"id":index,"name":"orario non d'ufficio"});
                controlloOrario[1]=index;
                index++;
            }else if(orario.getHours() < 0 || orario.getHours() > 24){
                throw new Error("Orario non valido");
            }

            //Creazione nodi terza colonna, mesi dell'anno
            switch(orario.getMonth()){
                case 0:
                    if((typeof controlloMese[0]) == "undefined"){
                        nodes.push({"id":index,"name":"Gennaio"});
                        controlloMese[0]=index;
                        index++;
                    }
                    break;
                case 1:
                    if((typeof controlloMese[1]) == "undefined"){
                        nodes.push({"id":index,"name":"Febbraio"});
                        controlloMese[1]=index;
                        index++;
                    }
                    break;
                case 2:
                    if((typeof controlloMese[2]) == "undefined"){
                        nodes.push({"id":index,"name":"Marzo"});
                        controlloMese[2]=index;
                        index++;
                    }
                    break;
                case 3:
                    if((typeof controlloMese[3]) == "undefined"){
                        nodes.push({"id":index,"name":"Aprile"});
                        controlloMese[3]=index;
                        index++;
                    }
                    break;
                case 4:
                    if((typeof controlloMese[4]) == "undefined"){
                        nodes.push({"id":index,"name":"Maggio"});
                        controlloMese[4]=index;
                        index++;
                    }
                    break;
                case 5:
                    if((typeof controlloMese[5]) == "undefined"){
                        nodes.push({"id":index,"name":"Giugno"});
                        controlloMese[5]=index;
                        index++;
                    }
                    break;
                case 6:
                    if((typeof controlloMese[6]) == "undefined"){
                        nodes.push({"id":index,"name":"Luglio"});
                        controlloMese[6]=index;
                        index++;
                    }
                    break;
                case 7:
                    if((typeof controlloMese[7]) == "undefined"){
                        nodes.push({"id":index,"name":"Agosto"});
                        controlloMese[7]=index;
                        index++;
                    }
                    break;
                case 8:
                    if((typeof controlloMese[8]) == "undefined"){
                        nodes.push({"id":index,"name":"Settembre"});
                        controlloMese[8]=index;
                        index++;
                    }
                    break;
                case 9:
                    if((typeof controlloMese[9]) == "undefined"){
                        nodes.push({"id":index,"name":"Ottobre"});
                        controlloMese[9]=index;
                        index++;
                    }
                    break;
                case 10:
                    if((typeof controlloMese[10]) == "undefined"){
                        nodes.push({"id":index,"name":"Novembre"});
                        controlloMese[10]=index;
                        index++;
                    }
                    break;
                case 11:
                    if((typeof controlloMese[11]) == "undefined"){
                        nodes.push({"id":index,"name":"Dicembre"});
                        controlloMese[11]=index;
                        index++;
                    }
                    break;
                default:
                    throw new Error("Mese non valido");
            }
        }*/
        //links
        //console.log(nodes.length);
        //console.log(Math.floor(15/10));

        let count = 0;
        let r1;
        let r2;
        for (let i = 0; i < nodes2.length; i++) {
            for (let j = i; j < nodes2.length && count < 5; j++) {
                r1 = nodes2[i].ratio;
                r2 = nodes2[j].ratio;
                if (Math.abs(r1-r2) < 2/*&& Math.floor(nodes2[i].ratio/10) == Math.floor(nodes2[j].ratio/10)*/) {
                    count++;
                    links.push({"source":nodes2[i].id,"target":nodes2[j].id,"value":5-Math.abs(r1-r2)});
                }
            }
            count = 0;
        }

        console.log(links);
        
        /*if((typeof controlloTipologia[0]) != "undefined"){
            if((typeof controlloOrario[0]) != "undefined" && contaLoginOra[0]!=0 ){
                //links.push({"source":controlloOrario[0],"target":controlloTipologia[0],"value":1});
            }
            
            if((typeof controlloOrario[1]) != "undefined" && contaLoginOra[1]!=0 ){
                //links.push({"source":controlloOrario[1],"target":controlloTipologia[0],"value":1});
            }
            for(let i=0;i<=controlloMese.length;i++){
                if((typeof controlloMese[i]) != "undefined" && contaLoginMese[i]!=0){
                    //links.push({"source":controlloTipologia[0],"target":controlloMese[i],"value":1});
                }
            }
            
            
        }
        
        if((typeof controlloTipologia[1]) != "undefined"){
            if((typeof controlloOrario[0]) != "undefined" && contaErrorOra[0]!=0){
                //links.push({"source":controlloOrario[0],"target":controlloTipologia[1],"value":1});
            }
            if((typeof controlloOrario[1]) != "undefined" && contaErrorOra[1]!=0){
                //links.push({"source":controlloOrario[1],"target":controlloTipologia[1],"value":1});
            }
            for(let i=0;i<=controlloMese.length;i++){
                if((typeof controlloMese[i]) != "undefined" && contaErrorMese[i]!=0){
                    //links.push({"source":controlloTipologia[1],"target":controlloMese[i],"value":1});
                }
            }
        }
        if((typeof controlloTipologia[2]) != "undefined"){
            if((typeof controlloOrario[0]) != "undefined" && contaLogoutOra[0]!=0){
                //links.push({"source":controlloOrario[0],"target":controlloTipologia[2],"value":1});
            }
            if((typeof controlloOrario[1]) != "undefined" && contaLogoutOra[1]!=0){
                //links.push({"source":controlloOrario[1],"target":controlloTipologia[2],"value":1});
            }
            for(let i=0;i<=controlloMese.length;i++){
                if((typeof controlloMese[i]) != "undefined" && contaLogoutMese[i]!=0){
                    //links.push({"source":controlloTipologia[2],"target":controlloMese[i],"value":1});
                }
            }
        }*/
        
        return [nodes2, links];
    }


    getNodesLinks(dataset, width, height, circlesRadius, force) {
        [this.nodes , this.links] = this.parseDati(dataset);

        console.log(this.nodes.length);
        
        /*this.nodes = [
            { "id": 0, "utente": 'utente1', "event": 'login'},
            { "id": 1, "utente": 'utente2', "event": 'error'},
            { "id": 2, "utente": 'utente3', "event": 'logout'},
            { "id": 3, "utente": 'utente4', "event": 'login'},
            { "id": 4, "utente": 'utente5', "event": 'error'},
        ];

        this.links = [
            { "source": 1, "target": 0, "value": 1 },
            { "source": 2, "target": 1, "value": 3 },
            { "source": 3, "target": 2, "value": 2 },
            { "source": 4, "target": 3, "value": 4 },
            { "source": 3, "target": 2, "value": 2 },
        ];*/

        

        let link = [
            { "source": 1, "target": 0, "value": 1 },
            { "source": 2, "target": 0, "value": 8 },
            { "source": 3, "target": 0, "value": 10 },
            { "source": 3, "target": 2, "value": 6 },
            { "source": 4, "target": 0, "value": 1 },
            { "source": 5, "target": 0, "value": 1 },
            { "source": 6, "target": 0, "value": 1 },
            { "source": 7, "target": 0, "value": 1 },
            { "source": 8, "target": 0, "value": 2 },
            { "source": 9, "target": 0, "value": 1 },
            { "source": 11, "target": 10, "value": 1 },
            { "source": 11, "target": 3, "value": 3 },
            { "source": 11, "target": 2, "value": 3 },
            { "source": 11, "target": 0, "value": 5 },
            { "source": 12, "target": 11, "value": 1 },
            { "source": 13, "target": 11, "value": 1 },
            { "source": 14, "target": 11, "value": 1 },
            { "source": 15, "target": 11, "value": 1 },
            { "source": 17, "target": 16, "value": 4 },
            { "source": 18, "target": 16, "value": 4 },
            { "source": 18, "target": 17, "value": 4 },
            { "source": 19, "target": 16, "value": 4 },
            { "source": 19, "target": 17, "value": 4 },
            { "source": 19, "target": 18, "value": 4 },
            { "source": 20, "target": 16, "value": 3 },
            { "source": 20, "target": 17, "value": 3 },
            { "source": 20, "target": 18, "value": 3 },
            { "source": 20, "target": 19, "value": 4 },
            { "source": 21, "target": 16, "value": 3 },
            { "source": 21, "target": 17, "value": 3 },
            { "source": 21, "target": 18, "value": 3 },
            { "source": 21, "target": 19, "value": 3 },
            { "source": 21, "target": 20, "value": 5 },
            { "source": 22, "target": 16, "value": 3 },
            { "source": 22, "target": 17, "value": 3 },
            { "source": 22, "target": 18, "value": 3 },
            { "source": 22, "target": 19, "value": 3 },
            { "source": 22, "target": 20, "value": 4 },
            { "source": 22, "target": 21, "value": 4 },
            { "source": 23, "target": 16, "value": 3 },
            { "source": 23, "target": 17, "value": 3 },
            { "source": 23, "target": 18, "value": 3 },
            { "source": 23, "target": 19, "value": 3 },
            { "source": 23, "target": 20, "value": 4 },
            { "source": 23, "target": 21, "value": 4 },
            { "source": 23, "target": 22, "value": 4 },
            { "source": 23, "target": 12, "value": 2 },
            { "source": 23, "target": 11, "value": 9 },
            { "source": 24, "target": 23, "value": 2 },
            { "source": 24, "target": 11, "value": 7 },
            { "source": 25, "target": 24, "value": 13 },
            { "source": 25, "target": 23, "value": 1 },
            { "source": 25, "target": 11, "value": 12 },
            { "source": 26, "target": 24, "value": 4 },
            { "source": 26, "target": 11, "value": 31 },
            { "source": 26, "target": 16, "value": 1 },
            { "source": 26, "target": 25, "value": 1 },
            { "source": 27, "target": 11, "value": 17 },
            { "source": 27, "target": 23, "value": 5 },
            { "source": 27, "target": 25, "value": 5 },
            { "source": 27, "target": 24, "value": 1 },
            { "source": 27, "target": 26, "value": 1 },
            { "source": 28, "target": 11, "value": 8 },
            { "source": 28, "target": 27, "value": 1 },
            { "source": 29, "target": 23, "value": 1 },
            { "source": 29, "target": 27, "value": 1 },
            { "source": 29, "target": 11, "value": 2 },
            { "source": 30, "target": 23, "value": 1 },
            { "source": 31, "target": 30, "value": 2 },
            { "source": 31, "target": 11, "value": 3 },
            { "source": 31, "target": 23, "value": 2 },
            { "source": 31, "target": 27, "value": 1 },
            { "source": 32, "target": 11, "value": 1 },
            { "source": 33, "target": 11, "value": 2 },
            { "source": 33, "target": 27, "value": 1 },
            { "source": 34, "target": 11, "value": 3 },
            { "source": 34, "target": 29, "value": 2 },
            { "source": 35, "target": 11, "value": 3 },
            { "source": 35, "target": 34, "value": 3 },
            { "source": 35, "target": 29, "value": 2 },
            { "source": 36, "target": 34, "value": 2 },
            { "source": 36, "target": 35, "value": 2 },
            { "source": 36, "target": 11, "value": 2 },
            { "source": 36, "target": 29, "value": 1 },
            { "source": 37, "target": 34, "value": 2 },
            { "source": 37, "target": 35, "value": 2 },
            { "source": 37, "target": 36, "value": 2 },
            { "source": 37, "target": 11, "value": 2 },
            { "source": 37, "target": 29, "value": 1 },
            { "source": 38, "target": 34, "value": 2 },
            { "source": 38, "target": 35, "value": 2 },
            { "source": 38, "target": 36, "value": 2 },
            { "source": 38, "target": 37, "value": 2 },
            { "source": 38, "target": 11, "value": 2 },
            { "source": 38, "target": 29, "value": 1 },
            { "source": 39, "target": 25, "value": 1 },
            { "source": 40, "target": 25, "value": 1 },
            { "source": 41, "target": 24, "value": 2 },
            { "source": 41, "target": 25, "value": 3 },
            { "source": 42, "target": 41, "value": 2 },
            { "source": 42, "target": 25, "value": 2 },
            { "source": 42, "target": 24, "value": 1 },
            { "source": 43, "target": 11, "value": 3 },
            { "source": 43, "target": 26, "value": 1 },
            { "source": 43, "target": 27, "value": 1 },
            { "source": 44, "target": 28, "value": 3 },
            { "source": 44, "target": 11, "value": 1 },
            { "source": 45, "target": 28, "value": 2 },
            { "source": 47, "target": 46, "value": 1 },
            { "source": 48, "target": 47, "value": 2 },
            { "source": 48, "target": 25, "value": 1 },
            { "source": 48, "target": 27, "value": 1 },
            { "source": 48, "target": 11, "value": 1 },
            { "source": 49, "target": 26, "value": 3 },
            { "source": 49, "target": 11, "value": 2 },
            { "source": 50, "target": 49, "value": 1 },
            { "source": 50, "target": 24, "value": 1 },
            { "source": 51, "target": 49, "value": 9 },
            { "source": 51, "target": 26, "value": 2 },
            { "source": 51, "target": 11, "value": 2 },
            { "source": 52, "target": 51, "value": 1 },
            { "source": 52, "target": 39, "value": 1 },
            { "source": 53, "target": 51, "value": 1 },
            { "source": 54, "target": 51, "value": 2 },
            { "source": 54, "target": 49, "value": 1 },
            { "source": 54, "target": 26, "value": 1 },
            { "source": 55, "target": 51, "value": 6 },
            { "source": 55, "target": 49, "value": 12 },
            { "source": 55, "target": 39, "value": 1 },
            { "source": 55, "target": 54, "value": 1 },
            { "source": 55, "target": 26, "value": 21 },
            { "source": 55, "target": 11, "value": 19 },
            { "source": 55, "target": 16, "value": 1 },
            { "source": 55, "target": 25, "value": 2 },
            { "source": 55, "target": 41, "value": 5 },
            { "source": 55, "target": 48, "value": 4 },
            { "source": 56, "target": 49, "value": 1 },
            { "source": 56, "target": 55, "value": 1 },
            { "source": 57, "target": 55, "value": 1 },
            { "source": 57, "target": 41, "value": 1 },
            { "source": 57, "target": 48, "value": 1 },
            { "source": 58, "target": 55, "value": 7 },
            { "source": 58, "target": 48, "value": 7 },
            { "source": 58, "target": 27, "value": 6 },
            { "source": 58, "target": 57, "value": 1 },
            { "source": 58, "target": 11, "value": 4 },
            { "source": 59, "target": 58, "value": 15 },
            { "source": 59, "target": 55, "value": 5 },
            { "source": 59, "target": 48, "value": 6 },
            { "source": 59, "target": 57, "value": 2 },
            { "source": 60, "target": 48, "value": 1 },
            { "source": 60, "target": 58, "value": 4 },
            { "source": 60, "target": 59, "value": 2 },
            { "source": 61, "target": 48, "value": 2 },
            { "source": 61, "target": 58, "value": 6 },
            { "source": 61, "target": 60, "value": 2 },
            { "source": 61, "target": 59, "value": 5 },
            { "source": 61, "target": 57, "value": 1 },
            { "source": 61, "target": 55, "value": 1 },
            { "source": 62, "target": 55, "value": 9 },
            { "source": 62, "target": 58, "value": 17 },
            { "source": 62, "target": 59, "value": 13 },
            { "source": 62, "target": 48, "value": 7 },
            { "source": 62, "target": 57, "value": 2 },
            { "source": 62, "target": 41, "value": 1 },
            { "source": 62, "target": 61, "value": 6 },
            { "source": 62, "target": 60, "value": 3 },
            { "source": 63, "target": 59, "value": 5 },
            { "source": 63, "target": 48, "value": 5 },
            { "source": 63, "target": 62, "value": 6 },
            { "source": 63, "target": 57, "value": 2 },
            { "source": 63, "target": 58, "value": 4 },
            { "source": 63, "target": 61, "value": 3 },
            { "source": 63, "target": 60, "value": 2 },
            { "source": 63, "target": 55, "value": 1 },
            { "source": 64, "target": 55, "value": 5 },
            { "source": 64, "target": 62, "value": 12 },
            { "source": 64, "target": 48, "value": 5 },
            { "source": 64, "target": 63, "value": 4 },
            { "source": 64, "target": 58, "value": 10 },
            { "source": 64, "target": 61, "value": 6 },
            { "source": 64, "target": 60, "value": 2 },
            { "source": 64, "target": 59, "value": 9 },
            { "source": 64, "target": 57, "value": 1 },
            { "source": 64, "target": 11, "value": 1 },
            { "source": 65, "target": 63, "value": 5 },
            { "source": 65, "target": 64, "value": 7 },
            { "source": 65, "target": 48, "value": 3 },
            { "source": 65, "target": 62, "value": 5 },
            { "source": 65, "target": 58, "value": 5 },
            { "source": 65, "target": 61, "value": 5 },
            { "source": 65, "target": 60, "value": 2 },
            { "source": 65, "target": 59, "value": 5 },
            { "source": 65, "target": 57, "value": 1 },
            { "source": 65, "target": 55, "value": 2 },
            { "source": 66, "target": 64, "value": 3 },
            { "source": 66, "target": 58, "value": 3 },
            { "source": 66, "target": 59, "value": 1 },
            { "source": 66, "target": 62, "value": 2 },
            { "source": 66, "target": 65, "value": 2 },
            { "source": 66, "target": 48, "value": 1 },
            { "source": 66, "target": 63, "value": 1 },
            { "source": 66, "target": 61, "value": 1 },
            { "source": 66, "target": 60, "value": 1 },
            { "source": 67, "target": 57, "value": 3 },
            { "source": 68, "target": 25, "value": 5 },
            { "source": 68, "target": 11, "value": 1 },
            { "source": 68, "target": 24, "value": 1 },
            { "source": 68, "target": 27, "value": 1 },
            { "source": 68, "target": 48, "value": 1 },
            { "source": 68, "target": 41, "value": 1 },
            { "source": 69, "target": 25, "value": 6 },
            { "source": 69, "target": 68, "value": 6 },
            { "source": 69, "target": 11, "value": 1 },
            { "source": 69, "target": 24, "value": 1 },
            { "source": 69, "target": 27, "value": 2 },
            { "source": 69, "target": 48, "value": 1 },
            { "source": 69, "target": 41, "value": 1 },
            { "source": 70, "target": 25, "value": 4 },
            { "source": 70, "target": 69, "value": 4 },
            { "source": 70, "target": 68, "value": 4 },
            { "source": 70, "target": 11, "value": 1 },
            { "source": 70, "target": 24, "value": 1 },
            { "source": 70, "target": 27, "value": 1 },
            { "source": 70, "target": 41, "value": 1 },
            { "source": 70, "target": 58, "value": 1 },
            { "source": 71, "target": 27, "value": 1 },
            { "source": 71, "target": 69, "value": 2 },
            { "source": 71, "target": 68, "value": 2 },
            { "source": 71, "target": 70, "value": 2 },
            { "source": 71, "target": 11, "value": 1 },
            { "source": 71, "target": 48, "value": 1 },
            { "source": 71, "target": 41, "value": 1 },
            { "source": 71, "target": 25, "value": 1 },
            { "source": 72, "target": 26, "value": 2 },
            { "source": 72, "target": 27, "value": 1 },
            { "source": 72, "target": 11, "value": 1 },
            { "source": 73, "target": 48, "value": 2 },
            { "source": 74, "target": 48, "value": 2 },
            { "source": 74, "target": 73, "value": 3 },
            { "source": 75, "target": 69, "value": 3 },
            { "source": 75, "target": 68, "value": 3 },
            { "source": 75, "target": 25, "value": 3 },
            { "source": 75, "target": 48, "value": 1 },
            { "source": 75, "target": 41, "value": 1 },
            { "source": 75, "target": 70, "value": 1 },
            { "source": 75, "target": 71, "value": 1 },
            { "source": 76, "target": 64, "value": 1 },
            { "source": 76, "target": 65, "value": 1 },
            { "source": 76, "target": 66, "value": 1 },
            { "source": 76, "target": 63, "value": 1 },
            { "source": 76, "target": 62, "value": 1 },
            { "source": 76, "target": 48, "value": 1 },
            { "source": 76, "target": 58, "value": 1 },
            { "source": 77, "target": 69, "value": 3 },
            { "source": 77, "target": 68, "value": 3 },
            { "source": 77, "target": 25, "value": 3 },
            { "source": 77, "target": 48, "value": 1 },
            { "source": 78, "target": 41, "value": 1 },
            { "source": 79, "target": 70, "value": 1 },
            { "source": 80, "target": 71, "value": 1 },
            { "source": 81, "target": 64, "value": 1 },
            { "source": 76, "target": 65, "value": 1 },
            { "source": 82, "target": 66, "value": 1 },
            { "source": 83, "target": 63, "value": 1 },
            { "source": 84, "target": 62, "value": 1 },
            { "source": 85, "target": 48, "value": 1 },
            { "source": 86, "target": 69, "value": 3 },
            { "source": 86, "target": 68, "value": 3 },
            { "source": 87, "target": 25, "value": 3 },
            { "source": 88, "target": 48, "value": 1 },
            { "source": 89, "target": 41, "value": 1 },
            { "source": 90, "target": 70, "value": 1 },
            { "source": 91, "target": 71, "value": 1 },
            { "source": 92, "target": 64, "value": 1 },
            { "source": 93, "target": 65, "value": 1 },
            { "source": 94, "target": 66, "value": 1 },
            { "source": 95, "target": 63, "value": 1 },
            { "source": 96, "target": 62, "value": 1 },
            { "source": 97, "target": 48, "value": 1 },
            { "source": 98, "target": 55, "value": 1 },
            { "source": 99, "target": 55, "value": 1 },
            { "source": 100, "target": 41, "value": 1 },
            { "source": 101, "target": 48, "value": 1 },
            { "source": 102, "target": 55, "value": 7 },
            { "source": 103, "target": 48, "value": 7 },
            { "source": 104, "target": 27, "value": 6 },
            { "source": 105, "target": 57, "value": 1 },
            { "source": 106, "target": 11, "value": 4 },
            { "source": 107, "target": 58, "value": 15 },
            { "source": 108, "target": 55, "value": 5 },
            { "source": 109, "target": 48, "value": 6 },
            { "source": 110, "target": 57, "value": 2 },
            { "source": 111, "target": 48, "value": 1 },
            { "source": 112, "target": 58, "value": 4 },
            { "source": 113, "target": 59, "value": 2 },
            { "source": 114, "target": 48, "value": 2 },
            { "source": 115, "target": 58, "value": 6 },
            { "source": 116, "target": 60, "value": 2 },
            { "source": 117, "target": 59, "value": 5 },
            { "source": 118, "target": 57, "value": 1 },
            { "source": 119, "target": 55, "value": 1 }
        ];

        //this.links = link;

        //console.log(this.svg);

        var links2 = this.svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(this.links)
            .enter()
            .append("line")
            .attr("stroke-width", function (d) { return Math.sqrt(d.value); });


        var nodes2 = this.svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(this.nodes, (d) => d.id)
            .enter()
            .append("circle")
            .attr("r", 4)
            .style('fill', (d) => {
                if (d.ratio > 66) {
                    return "green";
                } else if (d.ratio < 33) {
                    return "red";
                } else {
                    return "yellow";
                }
            })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
        /*.call(drag(simulation));*/



        /*console.log(this.nodes);
        console.log(this.links);

        console.log("ciao");

        console.log(nodes2);
        console.log(links2);*/



        
        /*console.log(links2);
        console.log(nodes2);
        console.log(this.links);
        console.log(this.nodes);*/

        this.force.nodes(this.nodes)
            .on("tick", ticked);

        this.force.force("link")
            .links(this.links);
            
            
        function ticked() {
            links2
                .attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            /*console.log(circlesRadius);
            console.log(width);
            console.log(height);*/
            nodes2
                .attr("cx", function (d) { return d.x = Math.max(circlesRadius, Math.min(width - circlesRadius, d.x)); })
                .attr("cy", function (d) { return d.y = Math.max(circlesRadius, Math.min(height - circlesRadius, d.y)); });
        }

        function dragstarted(d) {
            if (!d3.event.active) force.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) force.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }


        //console.log(links2);
        //console.log(nodes2);
    }



    /*drag(simulation) {
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }*/


    draw(dataset) {
        //d3.select('#visualization').html('');

        //console.log(dataset[1].getId());

        this.createSvg();
        this.force = this.createForce();



        //this.newSimulation(dataset);
        //this.getLinks();
        this.getNodesLinks(dataset, this.width, this.height, this.circlesRadius, this.force);

        //console.log(this.nodes);
        //console.log(this.links);

        //this.startSimulation(dataset);
    }
}