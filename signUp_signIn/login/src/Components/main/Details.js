import { Component } from "react";
import { useParams } from "react-router-dom";
import "../../style.css";
import Lesson from "./Lesson";
class Details extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  async componentDidMount() {
    const res = await fetch(`http://localhost:8081/${this.props.params.id}`);
    const json = await res.json();

    this.setState(Object.assign({ loading: false }, json));
  }

  render() {
    if (this.state.loading) {
      return <h2>loading .....</h2>;
    }

    const { id, image, text, name } = this.state;
    let length = text.split(" ").length;
    return <Lesson text={text} wordCount={length} id={id} name={name} />;
  }
}

const WrappedDetails = () => {
  const params = useParams();
  return <Details params={params} />;
};

export default WrappedDetails;
