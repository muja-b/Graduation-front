import { Component } from "react";
import { useParams } from "react-router-dom";
import "../../style.css";
import Lesson from "./Lesson";
class Test extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  async componentDidMount() {
    const res = await fetch(`http://localhost:5000/ScrapData`);
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json));
  }

  render() {
    if (this.state.loading) {
      return <h2>loading ..... {JSON.stringify(this.state)}</h2>;
    }

    const { text } = this.state;
    let length = text.split(" ").length;
    return (
      <Lesson text={text} wordCount={length} id={0} name={"test"} mode={3} />
    );
  }
}

const WarpedTest = () => {
  const params = useParams();
  return <Test params={params} />;
};

export default WarpedTest;
