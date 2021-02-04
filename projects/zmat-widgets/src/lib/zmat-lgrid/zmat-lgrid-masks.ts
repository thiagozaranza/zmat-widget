export function currencyMask(input): void {
  input.value = parseFloat(input.value.replace(/[^\d]/g,'').replace(/(\d\d?)$/,'.$1')).toFixed(2);
}

export function CPF_CNPJMask(input): void {
    if (input.value.length <= 11) {
      input.value = input.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
    } else {
      input.value = input.value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
    }
}
