import axios from 'axios';

export default {
  isTheBottomOfThePage: function () {
  const scrollY = window.scrollY
    const visible = document.documentElement.clientHeight
    const pageHeight = document.documentElement.scrollHeight
    const bottomOfPage = visible + scrollY >= pageHeight
    return bottomOfPage || pageHeight < visible
  },
  convertToBase64: function (file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = (e) => {
        resolve(e.target.result);
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
    })
  }, 
  async getLocationData(countrySigla) {
    let countrys = [], citys = [];
    countrys = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    if (!countrys) return;
    if(!countrySigla) return {countrys: countrys.data}
    const selectedCountry = countrySigla ? countrys.data.find((el) => el.sigla == countrySigla) : {};
    citys = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedCountry.id}/municipios`);
    return {
      countrys: countrys.data,
      citys: citys.data
    };
  },
}