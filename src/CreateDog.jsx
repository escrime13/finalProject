import React, { Component } from "react";
import { connect } from "react-redux";
class UnconnectedCreateDog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogName: "",
      dogAge: "",
      dogSex: "",
      dogBreed: "",
      dogHeight: "",
      dogWeight: "",
      likes: "",
      dislikes: "",
      interests: "",
      lookingFor: "",
      energyLevel: "",
      img: []
    };
  }
  handleDogNameChange = event => {
    console.log("new dogName", event.target.value);
    this.setState({ dogName: event.target.value });
  };
  handleDogAgeChange = event => {
    console.log("new dogAge", event.target.value);
    this.setState({ dogAge: event.target.value });
  };
  handleDogSexChange = event => {
    console.log("dog sex", event.target.value);
    this.setState({ dogSex: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    console.log("createDog form submitted");
    let data = new FormData();
    data.append("dogName", this.state.dogName);
    data.append("dogAge", this.state.dogAge);
    data.append("dogSex", this.state.dogSex);
    data.append("dogBreed", this.state.dogBreed);
    data.append("dogHeight", this.state.dogHeight);
    data.append("likes", this.state.likes);
    data.append("dislikes", this.state.dislikes);
    data.append("interests", this.state.interests);
    data.append("lookingFor", this.state.lookingFor);
    data.append("energyLevel", this.state.energyLevel);
    data.append("img", this.state.img);
    let response = await fetch("/createDogProfiles", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parse = JSON.parse(responseBody);
    if (parse.success) {
      this.props.dispatch({
        type: "login-success"
      });
      return;
    }
    window.alert("This dog name is already taken. Please try something else.");
  };
  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>Dog Name</div>
        <div>
          <input type="text" onChange={this.handleDogNameChange} />
        </div>
        <div>Dog Age</div>
        <div>
          <select value={this.state.value} onChange={this.handleDogAgeChange}>
            <option value="empty">Pick one...</option>
            <option value="2 to 4 Months">2 to 4 Months</option>
            <option value="5 to 8 Months">5 to 8 Months</option>
            <option value="9 to 12 Months">9 to 12 Months</option>
            <option value="1 Year old">1 Year old</option>
            <option value="2 Year old">2 Year old</option>
            <option value="3 Year old">3 Year old</option>
            <option value="4 Year old">4 Year old</option>
            <option value="5 Year old">5 Year old</option>
            <option value="6 Year old">6 Year old</option>
            <option value="7 Year old">7 Year old</option>
            <option value="8 Year old">8 Year old</option>
            <option value="9 Year old">9 Year old</option>
            <option value="10 Year old">10 Year old</option>
            <option value="11 Year old">11 Year old</option>
            <option value="12 Year old">12 Year old</option>
            <option value="13 Year old">13 Year old</option>
            <option value="14 Year old">+14 Year old</option>
          </select>
        </div>
        <div>Dog Sex</div>
        <div>
          <select value={this.state.value} onChange={this.handleDogSexChange}>
            <option value="empty">Pick one...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Spayed">Spayed</option>
            <option value="Neutered">Neutered</option>
          </select>
        </div>
        <div>Dog Breed</div>
        <select>
          <option value="empty"> Pick one...</option>
          <option value="Affenpinscher">Affenpinscher</option>
          <option value="Afghan hound">Afghan hound</option>
          <option value="Airedale terrier">Airedale terrier</option>
          <option value="Akita">Akita</option>
          <option value="Alaskan Malamute">Alaskan Malamute</option>
          <option value="American Staffordshire terrier">
            American Staffordshire terrier
          </option>
          <option value="American water spaniel">American water spaniel</option>
          <option value="Australian cattle dog">Australian cattle dog</option>
          <option value="Australian shepherd">Australian shepherd</option>
          <option value="Australian terrier">Australian terrier</option>
          <option value="Basenji">Basenji</option>
          <option value="Basset hound">Basset hound</option>
          <option value="Beagle">Beagle</option>
          <option value="Bearded collie">Bearded collie</option>
          <option value="Bedlington terrier">Bedlington terrier</option>
          <option value="Bernese mountain dog">Bernese mountain dog</option>
          <option value="Bichon frise">Bichon frise</option>
          <option value="Black and tan coonhound">
            Black and tan coonhound
          </option>
          <option value="Border collie">Border collie</option>
          <option value="Border terrier">Border terrier</option>
          <option value="Borzoi">Borzoi</option>
          <option value="Boston terrier">Boston terrier</option>
          <option value="Bouvier des Flandres">Bouvier des Flandres</option>
          <option value="Boxer">Boxer</option>
          <option value="Briard">Briard</option>
          <option value="Brittany">Brittany</option>
          <option value="Brussels griffon">Brussels griffon</option>
          <option value="Bull terrier">Bull terrier</option>
          <option value="Bulldog">Bulldog</option>
          <option value="Bullmastiff">Bullmastiff</option>
          <option value="Cairn terrier">Cairn terrier</option>
          <option value="Canaan dog">Canaan dog</option>
          <option value="Chesapeake Bay retriever">
            Chesapeake Bay retriever
          </option>
          <option value="Chihuahua">Chihuahua</option>
          <option value="Chinese crested">Chinese crested</option>
          <option value="Chinese shar-pei">Chinese shar-pei</option>
          <option value="Chow chow">Chow chow</option>
          <option value="Clumber spaniel">Clumber spaniel</option>
          <option value="Cocker spaniel">Cocker spaniel</option>
          <option value="Collie">Collie</option>
          <option value="Curly-coated retriever">Curly-coated retriever</option>
          <option value="Dachshund">Dachshund</option>
          <option value="Dalmatian">Dalmatian</option>
          <option value="Doberman pinscher">Doberman pinscher</option>
          <option value="English cocker spaniel">English cocker spaniel</option>
          <option value="English setter">English setter</option>
          <option value="English toy spaniel">English toy spaniel</option>
          <option value="Eskimo dog">Eskimo dog</option>
          <option value="Finnish spitz">Finnish spitz</option>
          <option value="flat-coated retriever">Flat-coated retriever</option>
          <option value="Fox terrier">Fox terrier</option>
          <option value="Foxhound">Foxhound</option>
          <option value="French bulldog">French bulldog</option>
          <option value="German shepherd">German shepherd</option>
          <option value="German shorthaired pointer">
            German shorthaired pointer
          </option>
          <option value="German wirehaired pointer">
            Germain wirehaired pointer
          </option>
          <option value="Golden retriever">Golden retriever</option>
          <option value="Gordon setter">Gordon setter</option>
          <option value="Great Dane">Great Dane</option>
          <option value="Greyhound">Greyhound</option>
          <option value="Irish setter">Irish setter</option>
          <option value="Irish water spaniel">Irish water spaniel</option>
          <option value="Irish wolfhound">Irish wolfhound</option>
          <option value="Jack Russell terrier">Jack Russell terrier</option>
          <option value="Japanese spaniel">Japanese spaniel</option>
          <option value="Keeshond">Keeshond</option>
          <option value="Kerry blue terrier">Kerry blue terrier</option>
          <option value="Komodor">Komodor</option>
          <option value="Kuvasz">Kuvasz</option>
          <option value="Labrador retriever">Labrador retriever</option>
          <option value="Lakeland terrier">Lakeland terrier</option>
          <option value="Lhasa apso">Lhasa apso</option>
          <option value="Maltese">Maltese</option>
          <option value="Manchester terrier">Manchester terrier</option>
          <option value="Mastiff">Mastiff</option>
          <option value="Mexican hairless">Mexican hairless</option>
          <option value="Newfoundland">Newfoundland</option>
          <option value="Norwegian elkhound">Norwegian elkhound</option>
          <option value="Norwich terrier">Norwich terrier</option>
          <option value="Otterhound">Otterhound</option>
          <option value="Papillon">Papillon</option>
          <option value="Pekingese">Pekingese</option>
          <option value="Pointer">Pointer</option>
          <option value="Pomeranian">Pomeranian</option>
          <option value="Pomsky">Pomsky</option>
          <option value="Poodle">Poodle</option>
          <option value="Pug">Pug</option>
          <option value="Puli">Puli</option>
          <option value="Rhodesian ridgeback">Rhodesian ridgeback</option>
          <option value="Rottweiler">Rottweiler</option>
          <option value="Saint Bernard">Saint Bernard</option>
          <option value="Saluki">Saluki</option>
          <option value="Samoyed">Samoyed</option>
          <option value="Schipperke">Schipperke</option>
          <option value="Schnauzer">Schnauzer</option>
          <option value="Scottish deerhound">Scottish deerhound</option>
          <option value="Scottish terrier">Scottish terrier</option>
          <option value="Sealyham terrier">Sealyham terrier</option>
          <option value="Shetland sheepdog">Shetland sheepdog</option>
          <option value="Shih tzu">Shih tzu</option>
          <option value="Shikoku">Shikoku</option>
          <option value="Siberian husky">Siberian husky</option>
          <option value="Silky terrier">Silky terrier</option>
          <option value="Skye terrier">Skye terrier</option>
          <option value="Staffordshire bull terrier">
            Staffordshire bull terrier
          </option>
          <option value="Soft-coated wheaten terrier">
            Soft-coated wheaten terrier
          </option>
          <option value="Sussex spaniel">Sussex spaniel</option>
          <option value="Spitz">Spitz</option>
          <option value="Tibetan terrier">Tibetan terrier</option>
          <option value="Vizsla">Vizsla</option>
          <option value="Weimaraner">Weimaraner</option>
          <option value="Welsh terrier">Welsh terrier</option>
          <option value="West Highland white terrier">
            West Highland white terrier
          </option>
          <option value="Whippet">Whippet</option>
          <option value="Yorkshire terrier"></option>
        </select>
        <div></div>
        <div>
          <input type="submit" />
        </div>
      </form>
    );
  };
}
let CreateDog = connect()(UnconnectedCreateDog);
export default CreateDog;
