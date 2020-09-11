const form = {
    data() {
        return {
            monthsList: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
            errors: [],
            step: 1,
            firstname: null,
            lastname: null,
            email: null,
            password: null,
            today: new Date().getFullYear(),
            gender: "",
            birth_date: null,
            birth_day: "",
            birth_month: "",
            birth_year: "",
            terms_accept: false,
            newsletter: true
        }
    },
    methods: {
        validateForm(e) {
            this.errors = [];
            if (this.step === 1) {
                if (this.validateStepOne() === true) {
                    this.step = 2
                }
            } else if (this.step === 2) {
                if (this.validateStepTwo()) {
                    this.submitForm();
                    this.step = 3
                }
            }

            e.preventDefault();
        },
        validateStepOne() {
            let isValid = true;

            if (!this.firstname) {
                this.errors["firstname"] = "Toto pole je povinné";
                isValid = false;
            }

            if (!this.email) {
                this.errors["email"] = "Toto pole je povinné";
                isValid = false;

            } else if (!this.validateEmail(this.email)) {
                this.errors["email"] = "Zadejte email ve správném formátu";
                isValid = false;
            }

            if (!this.lastname) {
                this.errors["lastname"] = "Toto pole je povinné";
                isValid = false;
            }

            if (!this.password) {
                isValid = false;
                this.errors["password"] = "Toto pole je povinné";


            } else if (!this.validatePassword(this.password)) {
                this.errors["password"] = "Heslo musí obsahovat alepsoň jedno číslo a jedno velké písmeno.";

                isValid = false;
            }


            return isValid;


        },
        validateStepTwo() {
            let isValid = true;

            if (this.gender === "") {
                this.errors["gender"] = "Toto pole je povinné";
                isValid = false;

            }

            if (this.birth_day === "" && this.birth_month === "" && this.birth_year === "") {
                this.errors["birth_date"] = "Toto pole je povinné";
                isValid = false;


            } else {
                this.birth_date =this.birth_year + "-" + String(this.birth_month).padStart(2, 0) + "-" + String(this.birth_day).padStart(2, 0);
            }

            if (!this.terms_accept) {
                this.errors["terms_accept"] = "Toto pole je povinné";
                isValid = false;
            }

            return isValid;

        },
        validateEmail(email) {
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        validatePassword(password) {
            let re = /^(.*[A-Z].*)(.*\d.*)$/

            return re.test(password)
        },
        previousStep(e) {
            e.preventDefault();
            this.step = 1
        },
        getYears(start, today) {
            return new Array(today - start).fill(start).map((n, i) => n + i).reverse();
        },
        submitForm() {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/" , true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({
                "email": this.email,
                "password": this.password,
                "firstName": this.firstname,
                "lastName": this.lastname,
                "birthday": this.birth_date,
                "gender": this.gender,
                "marketingConsent": this.newsletter
            })); 
        }
    }
}

Vue.createApp(form).mount('#form');