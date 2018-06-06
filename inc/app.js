//test project, to-do: design more weather conditions, layer them and if/else, min/max temp

window.onload = function () {

    new Vue({
        el: "#ilpleut",
        data: {
            latitude: 0.0,
            longitude: 0.0,
            getHumidity: '0',
            getCity: 'Locating...',
            getTemp: '',
            getConditions: '',
            getDetailedConditions: '',
            getWindSpeed: '0',
            locationInput: '',
            getUvIndex: '0',
            getForecast: '',
            getDate: '',
            getDay2: '',
            getDay3: '',
            getDay4: '',
            getDay2Temp: '',
            getDay3Temp: '',
            getDay4Temp: '',
            getDay2Conditions: '',
            getDay3Conditions: '',
            getDay4Conditions: '',

        },
        methods: {
            getLocation: function () {
                if (!navigator.geolocation) {
                    this.errorMsg = "Geolocation is not supported by your browser";
                    this.getCity = this.errorMsg;
                    console.warn(this.errorMsg);
                    return;
                }
                console.log('Getting current position..');
                var options = {timeout: 80000};
                navigator.geolocation.getCurrentPosition(this.success, this.error, options);
            },
            success: function (position) {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.latitude = parseFloat(this.latitude).toFixed(2);
                this.longitude = parseFloat(this.longitude).toFixed(2);

                this.getWeather();
            },
            getWeather: function () {

                var vm = this;
                var appId = '41c06d8f13cfbd976e5123eb5821a4e6';

                var myCurrentWeatherApi = 'https://api.openweathermap.org/data/2.5/forecast/daily/?lat=' + this.latitude + '&lon=' + this.longitude + '&appid=' + appId + '&cnt=4&units=metric';

                var myUvIndexApi = 'https://api.openweathermap.org/data/2.5/uvi?appid=' + appId + '&lat=' + this.latitude + '&lon=' + this.longitude;

                axios.get(myCurrentWeatherApi).then(function (response) {
                    vm.getCity = response.data.city.name;
                    //current day
                    vm.getHumidity = response.data.list[0].humidity;
                    vm.getWindSpeed = response.data.list[0].speed;
                    vm.getTemp = response.data.list[0].temp.max;
                    vm.getConditions = response.data.list[0].weather[0].main;
                    vm.getDetailedConditions = response.data.list[0].weather[0].description;
                    vm.getUvIndex = response.data.value;
                    //day 2 '[1]'
                    vm.getDay2 = response.data.list[1].dt;
                    vm.getDay2Temp = response.data.list[1].temp.day;
                    vm.getDay2Conditions = response.data.list[1].weather[0].description;
                    //day 3 '[2]'
                    vm.getDay3 = response.data.list[2].dt;
                    vm.getDay3Temp = response.data.list[2].temp.day;
                    vm.getDay3Conditions = response.data.list[1].weather[0].description;
                    //day 4 '[3]'
                    vm.getDay4 = response.data.list[3].dt;
                    vm.getDay4Temp = response.data.list[3].temp.day;
                    vm.getDay4Conditions = response.data.list[3].weather[0].description;
                    console.log('My weather API:' + myCurrentWeatherApi);
                }),
                    axios.get(myUvIndexApi).then(function (response) {
                        vm.getUvIndex = response.data.value;
                    })
            },
        },
        filters: {
            capitalize: function (value) {
                if (!value) return '';
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            },
            convertWind: function (value) {
                if (!value) return '';
                value = value * 18 / 5;
                return value;
            },
            roundUp: function (value, decimals) {
                if (!value) {
                    value = 0;
                }
                if (!decimals) {
                    decimals = 0;
                }
                value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
                return value;
            },
            convertDate: function (value) {
                if (!value) return '';
                var milliDate = value * 1000;
                var myDate = new Date(milliDate);

                var returnDate = myDate.toString();
                returnDate = returnDate.substring(0, 3);
                return returnDate;
            }
        },
        created: function () {
            this.getLocation();
            console.log('Ready Freddie!')
        }
    })
}