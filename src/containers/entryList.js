import React, { Component } from 'react';
import Entry from '../components/Entry';

class EntryList extends Component {
    render() {
        return(
            <div className="entry-container">
                {this.props.entries.map( entry =>
                    <Entry 
                        key={entry.id}
                        title={entry.title}
                        content={entry.content}
                    />)}
            </div>
        )
    }
}

export default EntryList;