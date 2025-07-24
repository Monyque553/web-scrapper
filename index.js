import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import Produto from './produto.js';

const seletorProduto = ".product-name";
const seletorValor = ".saleInCents-value";
const seletorDescricao = ".features--description";
const seletorImagem = ".swiper-wrapper img";

function lerUrlsDoArquivo(caminho) {
    const conteudo = fs.readFileSync(caminho, 'utf-8');
    return conteudo.split('\n').map(url => url.trim()).filter(url => url.length > 0);
}

async function scrap(url) {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    return new Produto(
        $(seletorProduto).text().trim(),
        $(seletorValor).text().trim(),
        $(seletorDescricao).text().trim(),
        $(seletorImagem).first().attr("src")
    ).getProduto();
}

async function main() {
    const urls = lerUrlsDoArquivo('input.txt'); 
    const produtos = [];

    for (const url of urls) {
        try {
            const produto = await scrap(url);
            produtos.push(produto);
        } catch (err) {
            console.error(`Erro ao processar ${url}:`, err.message);
        }
    }

    save_json(produtos);
}

function save_json(data) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile('dados.json', jsonData, (err) => {
        if (err) {
            console.error('Erro ao salvar arquivo:', err);
        } else {
            console.log('Arquivo salvo com sucesso!');
        }
    });
}

main();