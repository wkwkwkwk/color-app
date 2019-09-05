import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ColorBox.css';
import { palette } from '@material-ui/system';

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false
        };
        this.copyInfo = this.copyInfo.bind(this);
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    copyInfo() {
        this.props.copy(this.props.background);
    }

    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1500);
        });
    }

    goToMore(evt) {
        evt.stopPropagation();
        this.props.history.push(
            this.props.locaiton.pathname + "/" + this.props.individualColor
        );
    }

    render() {
        const { name, background, moreUrl, showLink } = this.props;
        const { copied } = this.state;
        return(
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className="ColorBox" style={{ background: background }}>
                    <div style={{ background }} className={`copy-overlay ${copied && "show"}`} />
                    <div className={`copy-msg ${copied && "show"}`}>
                        <h1>copied!</h1>
                        <p>{this.props.background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span>{name}</span>
                        </div>
                        <button className="copy-button">Copy</button>
                    </div>
                    {showLink && (
                        <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                            <span className="see-more">More</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox;