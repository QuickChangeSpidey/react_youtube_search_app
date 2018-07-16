import React, {Component} from "react";
import ReactDom from "react-dom";
import SearchBar from "./components/search_bar";
import YTSearch from "youtube-api-search";
import VideoList from "./components/video_list";
import VideoDetail from'./components/video_detail'
import _ from 'Lodash';

const YOUTUBE_API_KEY = 'AIzaSyAvLpZ4toDiqLAayoq06bgoq1PJdV2tPw4';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {videos:[], selectedVideo: null};

       this.videoSearch('surfboards');
    }

    videoSearch(term){
        YTSearch({key: YOUTUBE_API_KEY,term: term},  (data,error) => {
            if(error==null)
                this.setState({videos: data,
                    selectedVideo: data[0]});
            else
                console.log(error.toString());
        });
    }

    render(){

        const videoSearch = _.debounce((term) => {this.videoSearch(term)},300);

        return <div>
            <SearchBar onSearchTermChanged = { videoSearch } />
            <VideoDetail video = { this.state.selectedVideo}/>
            <VideoList
                onVideoSelect = {(selectedVideo) => this.setState({selectedVideo: selectedVideo})}
                videos = { this.state.videos }/>
        </div>;
    }
}

ReactDom.render(<App />, document.querySelector('.container'));

