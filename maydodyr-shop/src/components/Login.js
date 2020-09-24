import React from "react";
import { connect } from "react-redux";
import isoFetch from "isomorphic-fetch";
import { withRouter } from "react-router";

import "./style/Login.css";

import { set_userData, login } from "../redux/actions/usersData";
import {  add_item } from "../redux/actions/cart";

class Login extends React.PureComponent {
  state = {
    isFormStateRegister: false, //false-login true-register
    loginValue: "",
    passwordValue: "",
    checkDataStatus: true,
    //register
    loginRegisterValue: "",
    passwordRegisterValue: "",
    passwordRepeatRegisterValue: "",
    loginRegisterValid: true,
    passwordRegisterValid: true,
    passwordRepeatRegisterValid: true,
    loginErr: "",
  };

  componentDidMount() {
    this.loadData();
  }

  fetchError = (errorMessage) => {
    console.error(errorMessage);
  };

  loadData = () => {
    isoFetch("http://localhost:3004/usersData", {
      method: "get",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("fetch error " + response.status);
        else return response.json();
      })
      .then((data) => {
        this.props.dispatch(set_userData(data));
      })
      .catch((error) => {
        this.fetchError(error.message);
      });
  };

  changeFormState = () => {
    this.setState({ isFormStateRegister: !this.state.isFormStateRegister });
  };

  changeLogin = (EO) => {
    this.setState({ checkDataStatus: true, loginValue: EO.target.value });
  };

  changePassword = (EO) => {
    this.setState({ passwordValue: EO.target.value });
  };

  login = () => {
    const { usersData } = this.props.usersData;
    var isPassed = false;
    var userData = {};
    usersData.forEach((el) => {
      if (el.id === this.state.loginValue) {
        if (el.password === this.state.passwordValue) {
          isPassed = true;
          userData = el;
        }
      }
    });
    if (isPassed) {
      this.props.dispatch(login(userData));
      this.props.dispatch(add_item(userData.cart));
      this.props.history.push(this.props.itemsCatalog.lastVisitedPage);
    } else {
      this.setState({
        checkDataStatus: false,
        loginValue: "",
        passwordValue: "",
      });
    }
  };

  changeLoginRegister = (EO) => {
    if (!this.state.loginRegisterValid && EO.target.value.length >= 5) {
      this.setState({
        loginRegisterValid: true,
        loginRegisterValue: EO.target.value,
      });
    } else {
      this.setState({ loginRegisterValue: EO.target.value });
    }
  };
  changePasswordRegister = (EO) => {
    if (!this.state.passwordRegisterValid && EO.target.value.length >= 5) {
      this.setState({
        passwordRegisterValid: true,
        passwordRegisterValue: EO.target.value,
      });
    } else {
      this.setState({ passwordRegisterValue: EO.target.value });
    }
  };
  changePasswordRepeatRegister = (EO) => {
    let valid =
      EO.target.value === this.state.passwordRegisterValue ? true : false;
    this.setState({
      passwordRepeatRegisterValue: EO.target.value,
      passwordRepeatRegisterValid: valid,
    });
  };

  register = () => {
    var loginValid = true;
    var loginErr = "";

    var passwordValid = true;

    
    var regExp = /^[a-zA-Z0-9]+$/;

    //login
    if (!regExp.test(this.state.loginRegisterValue)) {
      loginValid = false;
      loginErr = "Некорректный логин";
    } else if (this.state.loginRegisterValue.length < 5) {
      loginValid = false;
      loginErr = "Логин должен содержать не менее 5 символов";
    } else {
      this.props.usersData.usersData.forEach((el) => {
        if (el.id === this.state.loginRegisterValue) {
          loginValid = false;
          loginErr = "Логин уже используется";
        }
      });
    }

    //password
    if (this.state.passwordRegisterValue.length < 6) {
      passwordValid = false;
    }

    if (loginValid && passwordValid) {
      var newUser = {
        isAdmin: false,
        id: this.state.loginRegisterValue,
        password: this.state.passwordRegisterValue,
        cart: []
      };
      isoFetch("http://localhost:3004/usersData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
    } else if (loginValid) {
      this.setState({
        passwordRegisterValue: "",
        passwordRepeatRegisterValue: "",
        passwordRegisterValid: passwordValid,
      });
    } else {
      this.setState({
        loginRegisterValue: "",
        passwordRegisterValue: "",
        passwordRepeatRegisterValue: "",
        loginRegisterValid: loginValid,
        loginErr: loginErr,
        passwordRegisterValid: passwordValid,
      });
    }
  };

  render() {
    const code = this.state.isFormStateRegister ? (
      //Регистрация
      <div>
        <div className="container">
          <b>Логин</b>

          <input
            type="text"
            placeholder={
              this.state.loginRegisterValid
                ? "Придумайте логин"
                : this.state.loginErr
            }
            className={this.state.loginRegisterValid ? "inputOk" : "inputErr"}
            value={this.state.loginRegisterValue}
            onChange={(EO) => {
              this.changeLoginRegister(EO);
            }}
          />

          <b>Пароль</b>
          <input
            type="password"
            placeholder={
              this.state.passwordRegisterValid
                ? "Придумайте пароль"
                : "Пароль слишком короткий"
            }
            className={
              this.state.passwordRegisterValid ? "inputOk" : "inputErr"
            }
            value={this.state.passwordRegisterValue}
            onChange={(EO) => {
              this.changePasswordRegister(EO);
            }}
          />

          <b>Повторите пароль</b>
          <input
            type="password"
            placeholder={
              this.state.passwordRepeatRegisterValid
                ? "Повторите пароль"
                : "Пароли не совпадают"
            }
            className={
              this.state.passwordRepeatRegisterValid ? "inputOk" : "inputErr"
            }
            value={this.state.passwordRepeatRegisterValue}
            onChange={(EO) => {
              this.changePasswordRepeatRegister(EO);
            }}
          />

          <button
            type="submit"
            disabled={
              !this.state.passwordRepeatRegisterValid ||
              !this.state.passwordRegisterValid ||
              !this.state.loginRegisterValid
            }
            onClick={() => {
              this.register();
            }}
          >
            Зарегестрировать
          </button>
        </div>

        <div className="container">
          <button type="button" className="cancelbtn">
            Cancel
          </button>
          <button
            type="button"
            className="stateBut"
            onClick={this.changeFormState}
          >
            У меня уже есть аккаунт
          </button>
        </div>
      </div>
    ) : (
      //Вход
      <div>
        <div className="container">
          <b>Логин</b>

          <input
            type="text"
            className={this.state.checkDataStatus ? "inputOk" : "inputErr"}
            placeholder={
              this.state.checkDataStatus
                ? "Введите логин"
                : "Введите корректные данные"
            }
            value={this.state.loginValue}
            onChange={(EO) => {
              this.changeLogin(EO);
            }}
          />

          <b>Пароль</b>

          <input
            className={this.state.checkDataStatus ? "inputOk" : "inputErr"}
            type="password"
            placeholder={
              this.state.checkDataStatus
                ? "Введите пароль"
                : "Введите корректные данные"
            }
            value={this.state.passwordValue}
            onChange={(EO) => {
              this.changePassword(EO);
            }}
          />

          <button type="submit" onClick={this.login}>
            Войти
          </button>
        </div>

        <div className="container">
          <button type="button" className="cancelbtn">
            Cancel
          </button>
          <button
            type="button"
            className="stateBut"
            onClick={this.changeFormState}
          >
            Регистрация
          </button>
        </div>
      </div>
    );
    return (
      <div className="formContainer">
        <div className="imgcontainer">
          <img src="/Maydodyr.jpg" alt="Maydodyr" className="avatar" />
        </div>
        {code}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  itemsCatalog: state.itemsCatalog,
  usersData: state.usersData,
  cart: state.cart
});

export default connect(mapStateToProps)(withRouter(Login));
