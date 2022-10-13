 //Как только DOM контент загрузится, выполнять
window.addEventListener('DOMContentLoaded', function() {   
  
    //блок объявления переменных
    let InputText = document.getElementById('input_text');  
    let InputKey = document.getElementById('input_key');
    let UserStep = Number(InputKey.value);
    let output = document.getElementById('output');
    let Encrypt = document.getElementById('encrypt-btn');
    let Decrypt = document.getElementById('decrypt-btn');
    let Reset = document.getElementById('reset-btn');
    let TextToWork;
    let pos;
    
    //блок объявления массивов с символами
    let Symbols = [' ',',','.',':',';','!','?','-','_','=','+','(',')','[',']','@','`',"'",'"','<','>','|','/','%','$','^','&','*','~'];
    let Numbers = ['0','1','2','3','4','5','6','7','8','9'];
    let NumbersEncrypt = Array(10);
    let RusAlfUp = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
    let RusAlfUpEncrypt = Array(33);
    let RusAlfLower = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'];
    let RusAlfLowerEncrypt = Array(33);
    let EngAlfUp = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let EngAlfUpEncrypt = Array(26); 
    let EngAlfLower = ['a','b','c','d','e','f','g','h','i','j','k','l','m','m','o','p','q','r','s','t','u','v','w','x','y','z'];
    let EngAlfLowerEncrypt = Array(26);
    
    initEncrypt(); //Сдвиг первоначального массива
    //функция сдвига первоначального массива на ключ, введенный пользователем
    function initEncrypt() {
      NumbersEncrypt = CaezarEncrypt(UserStep, Numbers);
      RusAlfUpEncrypt = CaezarEncrypt(UserStep, RusAlfUp);
      RusAlfLowerEncrypt = CaezarEncrypt(UserStep, RusAlfLower);
      EngAlfUpEncrypt = CaezarEncrypt(UserStep, EngAlfUp);
      EngAlfLowerEncrypt = CaezarEncrypt(UserStep, EngAlfLower);
    }

    //При изменении ключа сдвиг вызывается снова
    InputKey.addEventListener('change', function() { 
      UserStep = Number(this.value);
      initEncrypt();
    });
    
    function CaezarEncrypt(step, arr) {
      if (step>arr.length) {
        step=step%arr.length;
      }
      let CopyAlf=arr.slice(step).concat(arr.slice(0,step)); //делает копию сдвинутого массива
      console.log(CopyAlf);
      return CopyAlf; 
    }
    //проверка, содержится ли символ 
    function contains(symb, arr) {
      let letter = symb;
      pos = 0;
      for (let i = 0; i < arr.length; i++) {
        if (letter === arr[i]) {
          pos = i;
          return true;
        }
      }
    }
    //шифрование
    function encrypt(text) {
      let output = '';
      for (let i = 0; i <= text.length; i++) {
        let symbol = text[i];
        if (contains(symbol, Symbols)) {
          output += symbol;
        }
        if (contains(symbol, Numbers)) {
          // symbol = NumbersEncrypt[pos]; Сдвиг цифр
          output += symbol;
        }
        if (contains(symbol, RusAlfUp)) {
            symbol = RusAlfUpEncrypt[pos];
            output += symbol;
        }
        if ((contains(symbol, RusAlfLower))) {
            symbol = RusAlfLowerEncrypt[pos];
            output += symbol;
        }
        if (contains(symbol, EngAlfUp)) {
            symbol = EngAlfUpEncrypt[pos];
            output += symbol;
        }
        if ((contains(symbol, EngAlfLower))) {
            symbol = EngAlfLowerEncrypt[pos];
            output += symbol;
        }
      }
      return output;
    }
    //дешифрация
    function decrypt(text) {
      let output = '';
      for (let i = 0; i <= text.length; i++) {
        let symbol = text[i];
        if (contains(symbol, Symbols)) {
          output += symbol;
        }
        if (contains(symbol, NumbersEncrypt)) {
          // symbol = Numbers[pos]; //сдвиг цифр
          output += symbol;
        }
        if (contains(symbol, RusAlfUpEncrypt)) {
            symbol = RusAlfUp[pos];
            output += symbol;
        }
        if ((contains(symbol, RusAlfLowerEncrypt))) {
            symbol = RusAlfLower[pos];
            output += symbol;
        }
        if (contains(symbol, EngAlfUpEncrypt)) {
            symbol = EngAlfUp[pos];
            output += symbol;
        }
        if ((contains(symbol, EngAlfLowerEncrypt))) {
            symbol = EngAlfLower[pos];
            output += symbol;
        }
      }
      return output;
    }
    //вывод зашифрованного текста
    Encrypt.addEventListener('click', function() {
      TextToWork = InputText.value;
      output.value = encrypt(TextToWork);
    });
    //вывод дешифрованного текста
    Decrypt.addEventListener('click', function() {
      TextToWork = InputText.value;
      output.value = decrypt(TextToWork);
    });
    //Сброс текста
    Reset.addEventListener('click', function() {
      InputText.value = '';
      output.value = '';
    });
    
  });