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
        }
}