const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');


async function scrap(){
    const response = await axios.get("https://www.netshoes.com.br/p/creatina-pura-monohidratada-po-525g-sem-sabor-ronnie-coleman-sem+sabor-X37-0020-289");
    const $ = cheerio.load(response.data);
    console.log($(".product-name").text().trim());
    console.log($(".saleInCents-value").text().trim());
    console.log($(".features--description").text().trim());
    console.log($(".swiper-wrapper img").first().attr("src"));

    const info = {
        nome : $(".product-name").text().trim(),
        valor : $(".saleInCents-value").text().trim(),
        descrição : $(".features--description").text().trim()
       
    };

    console.log(info)
    //save_json(info);

    
    
}

function save_json(data){
    const jsonData = JSON.stringify(data, null, 2);

    fs.writeFile('dados.json', jsonData, (err) => {
    if (err) {
        console.error('Erro ao salvar arquivo:', err);
    } else {
        console.log('Arquivo salvo com sucesso!');
    }
    });
}


 
scrap();