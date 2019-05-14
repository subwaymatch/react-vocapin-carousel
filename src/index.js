import React from "react";
import ReactDOM from "react-dom";

import "reset-css";
import "./styles.scss";

let newId = 1;
let l = [
  {
    id: newId++,
    title: "XSS",
    desc: "Cross-site Scripting"
  },

  {
    id: newId++,
    title: "CSRF",
    desc: "Cross-Site Request Forgery"
  },

  {
    id: newId++,
    title: "DDoS",
    desc: "Denial of Service"
  },
  {
    id: newId++,
    title: "SQL Injection",
    desc: "Inject SQL script in input forms"
  },
  {
    id: newId++,
    title: "Manual hacking",
    desc: "Oh no, bad guys"
  },
  {
    id: newId++,
    title: "Good Friend",
    desc: "When r'u gonna boom me?"
  },
  {
    id: newId++,
    title: "No so bien",
    desc: "Muy bien hoarracha?"
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0
    };

    this.distancesFromCenter = this.getDistancesFromCenter(
      l,
      this.state.currentIndex
    );

    this.moveToPrevSlide = this.moveToPrevSlide.bind(this);
    this.moveToNextSlide = this.moveToNextSlide.bind(this);
  }

  moveToPrevSlide() {
    this.setState(prevState => {
      return {
        currentIndex: (prevState.currentIndex + l.length - 1) % l.length
      };
    });
  }

  moveToNextSlide() {
    this.setState(prevState => ({
      currentIndex: (prevState.currentIndex + 1) % l.length
    }));
  }

  getDistancesFromCenter(items, currentIndex) {
    const numItems = items.length;
    const numItemsOnLeft =
      numItems % 2 === 0 ? numItems / 2 - 1 : Math.floor(numItems / 2);
    const numItemsOnRight = numItems - 1 - numItemsOnLeft;
    const distanceFromCenter = new Array(numItems);

    for (let i = 0; i < numItems; i++) {
      if (i < currentIndex) {
        if (currentIndex - i <= numItemsOnLeft) {
          distanceFromCenter[i] = i - currentIndex;
        } else {
          distanceFromCenter[i] = numItems - currentIndex + i;
        }
      } else if (i > currentIndex) {
        if (i - currentIndex <= numItemsOnRight) {
          distanceFromCenter[i] = i - currentIndex;
        } else {
          distanceFromCenter[i] = i - numItems - currentIndex;
        }
      } else {
        distanceFromCenter[i] = 0;
      }
    }

    return distanceFromCenter;
  }

  render() {
    let items = l;
    const itemWidth = 300;
    const itemHorizontalMargin = 30;

    const distancesFromCenter = this.getDistancesFromCenter(
      items,
      this.state.currentIndex
    );

    console.log("in render, prev");
    console.log(this.distancesFromCenter);

    console.log("after");
    console.log(distancesFromCenter);

    const shouldAnimate = [];

    for (let i = 0; i < distancesFromCenter.length; i++) {
      shouldAnimate[i] =
        Math.abs(distancesFromCenter[i] - this.distancesFromCenter[i]) <= 1;
    }

    this.distancesFromCenter = distancesFromCenter;

    console.log("shouldAnimate=", shouldAnimate);

    return (
      <div id="app">
        <div className="carousel-container">
          <div className="items-wrapper">
            {items.map((item, idx) => {
              let originalXPos = (itemWidth + itemHorizontalMargin * 2) * idx;
              let targetXPos =
                (itemWidth + itemHorizontalMargin * 2) *
                distancesFromCenter[idx];
              let itemXOffset = targetXPos - originalXPos;

              const itemStyle = {
                transform: `translateX(${itemXOffset}px)`
              };

              if (shouldAnimate[idx] === true) {
                itemStyle.transition = `0.4s linear`;
              }

              return (
                <div key={idx} style={itemStyle}>
                  <div className="id">
                    <strong>Idx:</strong> {idx}
                  </div>
                  <div className="title">{item.title}</div>
                </div>
              );
            })}
          </div>

          <div className="controls">
            <button onClick={this.moveToPrevSlide}>Prev</button>
            <span>|</span>
            <button onClick={this.moveToNextSlide}>Next</button>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
