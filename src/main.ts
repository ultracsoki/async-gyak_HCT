import { Allproducts, Product } from "./product";
import './style.css';

document.getElementById('buttonMind')!.addEventListener('click',mind);
document.getElementById('buttonABC')!.addEventListener('click',abcSorrend);
document.getElementById('buttonLegdragabbElol')!.addEventListener('click',legDragabbElol);
document.getElementById('buttonLeirasbanKereses')!.addEventListener('click',leirasbanKereses);
document.getElementById('buttonAjanlat')!.addEventListener('click',ajanlat);
document.getElementById('buttonKategoriak')!.addEventListener('click',kategoriakLetrehozasa);

async function betoltes()
{
  let eredmeny = await fetch('products.json');
  if(!eredmeny.ok)
  {
      throw new Error('Hiba történt a letöltés közben.');
  }
  let tartalom = await eredmeny.json() as Allproducts;
  return tartalom;
}

async function mind()
{
  let tomb = await betoltes();
  adatMegjelenites(tomb.products);
}

async function abcSorrend()
{
  let tomb = await betoltes();
  const rendezett = tomb.products.sort((a, b) => a.title < b.title ? -1 : 1);
  adatMegjelenites(rendezett);
}

async function legDragabbElol()
{
  let tomb = await betoltes();
  const rendezett = tomb.products.sort((a, b) => a.price < b.price ? 1 : -1);
  adatMegjelenites(rendezett);
}

async function leirasbanKereses()
{
  const leiras = (document.getElementById('inputLeirasbanKereses') as HTMLInputElement).value;
  let tomb = await betoltes();
  const szurt = tomb.products.filter(termek => 
    termek.title.toLowerCase().includes(leiras.toLowerCase())
  );
  adatMegjelenites(szurt);
}

async function ajanlat()
{
  let tomb = await betoltes();
  const szurt = tomb.products.filter(termek => 
    termek.price < 100
  ).sort((a, b) => a.rating < b.rating ? 1 : -1);
  adatMegjelenites(szurt);
}

let kategoriak : string[] = [];

async function kategoriakLetrehozasa()
{
  let tomb = await betoltes();
  tomb.products.forEach(element => {
    if(!kategoriak.includes(element.category))
    {
      kategoriak.push(element.category);
    }
  });
  buttonLetrehozas();
}

async function buttonLetrehozas()
{
  let tomb = await betoltes();
  kategoriak.forEach(element => {
    const kategoriakDiv = document.getElementById('kategoriak')!;
    const button = document.createElement('button');
    button.textContent = `${element}`;
    kategoriakDiv.appendChild(button);

    button.addEventListener('click', (e) => {
      const szurt = tomb.products.filter(termek => 
        termek.category == button.textContent);
      adatMegjelenites(szurt);
    });
  });
}

function adatMegjelenites(termekLista : Product[])
{
  document.getElementById('tbody')!.textContent = "";
  for (let i = 0; i < termekLista.length; i++) {
    const tbody = document.getElementById('tbody')!;
    const tr = document.createElement('tr');
    const tdId = document.createElement('td');
    const tdTitle = document.createElement('td');
    const tdDescription = document.createElement('td');
    const tdPrice = document.createElement('td');
    const tdDiscountPercentage = document.createElement('td');
    const tdRating = document.createElement('td');
    const tdStock = document.createElement('td');
    const tdBrand = document.createElement('td');
    const tdCategory = document.createElement('td');
    const tdThumbnail = document.createElement('td');
    tdId.textContent = `${termekLista[i].id}`;
    tdTitle.textContent = `${termekLista[i].title}`;
    tdDescription.textContent = `${termekLista[i].description}`;
    tdPrice.textContent = `${termekLista[i].price}`;
    tdDiscountPercentage.textContent = `${termekLista[i].discountPercentage}`;
    tdRating.textContent = `${termekLista[i].rating}`;
    tdStock.textContent = `${termekLista[i].stock}`;
    tdBrand.textContent = `${termekLista[i].brand}`;
    tdCategory.textContent = `${termekLista[i].category}`;
    tdThumbnail.innerHTML = `<img src="${termekLista[i].thumbnail}" width="150px">`;
    tr.appendChild(tdId);
    tr.appendChild(tdTitle);
    tr.appendChild(tdDescription);
    tr.appendChild(tdPrice);
    tr.appendChild(tdDiscountPercentage);
    tr.appendChild(tdRating);
    tr.appendChild(tdStock);
    tr.appendChild(tdBrand);
    tr.appendChild(tdCategory);
    tr.appendChild(tdThumbnail);
    tbody.appendChild(tr);
  }
}