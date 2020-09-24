import React from "react";
import { connect } from "react-redux";
import isoFetch from "isomorphic-fetch";

import "./style/AddItem.css";
import { set_catalog } from "../redux/actions/catalog";

class AddItem extends React.PureComponent {
  state = {
    id: 0,
    name: "",
    producer: "",
    imgUrl: "",
    description: "",
    section: "",
    price: "",
    isNameValid: true,
    isProducerValid: true,
    isImgUrlValid: true,
    isDescriptionValid: true,
    isSectionValid: true,
    isPriceValid: true,
  };

  componentDidMount() {
    this.dataRequest();
  }

  fetchError = (errorMessage) => {
    console.error(errorMessage);
  };
  dataRequest = () => {
    isoFetch(`http://localhost:3004/itemCatalog`, {
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
        this.props.dispatch(set_catalog(data));
      })
      .catch((error) => {
        this.fetchError(error.message);
      });
  };

  changeInput = (EO, inp) => {
    if (inp === "name") {
      this.setState({ name: EO.target.value, isNameValid: true });
    } else if (inp === "producer") {
      this.setState({ producer: EO.target.value, isProducerValid: true });
    } else if (inp === "imgUrl") {
      this.setState({ imgUrl: EO.target.value, isImgUrlValid: true });
    } else if (inp === "description") {
      this.setState({ description: EO.target.value, isDescriptionValid: true });
    } else if (inp === "price") {
      this.setState({ price: EO.target.value, isPriceValid: true });
    } else if (inp === "section") {
      this.setState({ section: EO.target.value, isSectionValid: true });
    }
  };

  reset = () => {
    this.setState({
      name: "",
      producer: "",
      imgUrl: "",
      description: "",
      section: "",
      price: 0,
      isNameValid: true,
      isProducerValid: true,
      isImgUrlValid: true,
      isDescriptionValid: true,
      isSectionValid: true,
      isPriceValid: true,
    });
  };

  add = () => {
    let nameValid = true;
    let producerValid = true;
    let imgUrlValid = true;
    let descriptionValid = true;
    let sectionValid = true;
    let priceValid = true;

    let {
      id,
      name,
      producer,
      imgUrl,
      description,
      section,
      price,
    } = this.state;

    if (name.length < 5) {
      nameValid = false;
    }
    if (producer.length < 3) {
      producerValid = false;
    }
    if (imgUrl.length < 10) {
      imgUrlValid = false;
    }
    if (description.length < 20) {
      descriptionValid = false;
    }
    if (!section) {
      sectionValid = false;
    }
    var regExp = /^(\d+\.\d{1,2})$/;
    if (!regExp.test(price)) {
      priceValid = false;
    }

    if (
      nameValid &&
      producerValid &&
      imgUrlValid &&
      descriptionValid &&
      sectionValid &&
      priceValid
    ) {
      var newItem = {
        id: id,
        name: name,
        producer: producer,
        imgUrl: imgUrl,
        description: description,
        section: section,
        price: price,
      };
      this.postData(newItem);
    } else {
      this.setState({
        name: name,
        producer: producer,
        imgUrl: imgUrl,
        description: description,
        section: section,
        price: price,
        isNameValid: nameValid,
        isProducerValid: producerValid,
        isImgUrlValid: imgUrlValid,
        isDescriptionValid: descriptionValid,
        isSectionValid: sectionValid,
        isPriceValid: priceValid,
      });
    }
  };

  postData = (data) =>
    isoFetch("http://localhost:3004/itemCatalog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

  render() {
    const {
      isReady,

      catalog,
    } = this.props.itemsCatalog;

    if (isReady) {
      this.setState({ id: catalog.length });
    }

    var code = isReady ? (
      <div>
        <div className="container">
          <b>ID: {catalog.length}</b>
          <br />
          <b>Название товара</b>
          <input
            type="text"
            placeholder={
              this.state.isNameValid
                ? "Название товара"
                : "Слишком короткое название"
            }
            className={this.state.isNameValid ? "inputOk" : "inputErr"}
            value={this.state.name}
            onChange={(EO) => {
              this.changeInput(EO, "name");
            }}
          />

          <b>Производитель</b>
          <input
            type="text"
            placeholder={
              this.state.isProducerValid
                ? "Производитель"
                : "Слишком короткое название"
            }
            className={this.state.isProducerValid ? "inputOk" : "inputErr"}
            value={this.state.producer}
            onChange={(EO) => {
              this.changeInput(EO, "producer");
            }}
          />

          <b>Ссылка на изображение</b>
          <input
            type="text"
            placeholder={this.state.isImgUrlValid ? "Ссылка" : "Введите ссылку"}
            className={this.state.isImgUrlValid ? "inputOk" : "inputErr"}
            value={this.state.imgUrl}
            onChange={(EO) => {
              this.changeInput(EO, "imgUrl");
            }}
          />

          <b>Описание товара</b>
          <input
            type="text"
            placeholder={
              this.state.isDescriptionValid
                ? "Описание"
                : "Слишком короткое описание"
            }
            className={this.state.isDescriptionValid ? "inputOk" : "inputErr"}
            value={this.state.description}
            onChange={(EO) => {
              this.changeInput(EO, "description");
            }}
          />

          <b>Выберите раздел</b>
          <select
            className={
              this.state.isSectionValid
                ? "select-css"
                : " select-css select-cssErr"
            }
            value={this.state.section}
            onChange={(EO) => {
              this.changeInput(EO, "section");
            }}
          >
            <option value="" disabled={true}>
              Выберите раздел
            </option>
            <option value="sponges">Губки</option>
            <option value="napkins">Тряпки</option>
            <option value="cleaning">Уборка</option>
            <option value="washing">Стирка</option>
          </select>

          <b>Введите цену</b>
          <input
            type="number"
            placeholder={
              this.state.isPriceValid ? "Цена" : "Цена должна быть больше 0"
            }
            className={this.state.isPriceValid ? "inputOk" : "inputErr"}
            value={this.state.price}
            onChange={(EO) => {
              this.changeInput(EO, "price");
            }}
          />
          <button
            type="submit"
            disabled={
              !this.state.isNameValid ||
              !this.state.isDescriptionValid ||
              !this.state.isImgUrlValid ||
              !this.state.isProducerValid ||
              !this.state.isSectionValid ||
              !this.state.isPriceValid
            }
            onClick={() => {
              this.add();
            }}
          >
            Добавить товар
          </button>
        </div>

        <div className="container">
          <button type="button" className="cancelbtn" onClick={this.reset}>
            Сбросить данные
          </button>
        </div>
      </div>
    ) : (
      "Загрузка..."
    );
    return <div> {code}</div>;
  }
}

const mapStateToProps = (state) => ({
  itemsCatalog: state.itemsCatalog,
});

export default connect(mapStateToProps)(AddItem);
