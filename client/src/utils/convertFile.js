export default {
    convertToBase64 (file) {
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
