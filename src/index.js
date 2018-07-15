import React, {Component} from "react";
import ReactDom from "react-dom";
import SearchBar from "./components/search_bar";
import YTSearch from "youtube-api-search";
import VideoList from "./components/video_list";

const YOUTUBE_API_KEY = 'AIzaSyAvLpZ4toDiqLAayoq06bgoq1PJdV2tPw4';




class App extends Component {

    constructor(props){
        super(props);

        this.state = {videos:[]};

        YTSearch({key: YOUTUBE_API_KEY,term: "surfing"},  (data,error) => {
            if(error==null)
                this.setState({videos: data});
            else
                console.log(error.toString());
        });
    }

    render(){
        return <div>
            <SearchBar />
            <VideoList videos={this.state.videos}/>
        </div>;
    }

}



ReactDom.render(<App />, document.querySelector('.container'));

