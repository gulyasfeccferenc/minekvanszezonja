import React, { Component } from "react";
import styles from "./CookieConsent.module.scss";
import { Button } from "antd";

export default class CookieConsent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.CookieBanner}>
        <p>
          A sütik segítenek szolgáltatásaink biztosításában. Szolgáltatásaink
          használatával beleegyezzel a sütik használatába.{" "}
          <a href="">További információ</a>
        </p>
        <p>
          <Button>Elfogadom</Button>
        </p>
      </div>
    );
  }
}
