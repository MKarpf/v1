const dal = require('./../00_DAL/index');

class LanguagePerCountry{
    
    static createTable(){
        return dal.runQuery(`create table LanguagePerCountry(
            Id int AUTO_INCREMENT PRIMARY KEY,
            LanguageId int NOT NULL,
            CountryId int NOT NULL,
            FOREIGN KEY (LanguageId) REFERENCES Languages(Id),
            FOREIGN KEY (CountryId) REFERENCES Countries(Id)
            )`
        );
    }

    static dropTable(){
        return dal.runQuery('drop table if exists LanguagePerCountry');  
    }

    static insertTable(){
        return dal.runQueryWithParam("INSERT INTO LanguagePerCountry (LanguageId,CountryId) VALUES ?",this.getValues());
    }

    static getValues(){
        let countries=dal.getAllJsonData();
        let languages=[];
        countries.filter((country)=>{
            //select to find the countryId
            //let CountryId = dal.selectFromTable("select Id from Countries where CountryName like  ?",country.name);
            country.languages.filter(function(lang){
                let langg =[];
                 //select to find the LanguageId
                let LanguageId = dal.selectFromTable("select Id from Languages where LanguageName =  ?",'German',
                (res, extra) => { console.log(res) },
                (err) => { console.log("sorry err", err) }
                );;
                //langg.push(LanguageId,CountryId);
                //console.log(langg);
                //languages.push(langg);
            });
        });
        return languages;
    }
}


module.exports={LanguagePerCountry}