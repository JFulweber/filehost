import React from 'react';
import FileTools from '../../components/FileTools/FileTools.jsx';
import styles from './FileElement.scss';


export default class FileElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.dir = this.props.dir;
        this.onClick = this.onClick.bind(this);
        this.getIcon = this.getIcon.bind(this);
        this.state.icon = 'far fa-file';
        this.state.needsIcons = 0;
    }

    componentDidMount() {
        this.getIcon();
    }

    onClick(e) {
        window.open(`http://localhost:3000/filedl?token=${localStorage.getItem('token')}&path=${this.props.path}&rawName=${this.props.rawName}`) // <-- TRIGGERS FILE SAVE PROMPT
    }

    getIcon() {
        var mime = this.props.iconType;
        var type = mime.split('/')[0];
        var spec = mime.split('/')[1]
        switch (type) {
            case "audio":
                this.setState({ icon: 'far fa-file-audio' });
                break;
            case "video":
                this.setState({ icon: 'far fa-file-video' });
                break;
            case "text":
                this.setState({ icon: 'far fa-file-alt' });
                break;
            case "image":
                this.setState({ icon: 'far fa-file-image' });
                break;
            case "application":
                switch (spec) {
                    case "pdf":
                        this.setState({ icon: 'far fa-file-pdf' });
                        break;
                    case "x-zip-compressed":
                        this.setState({ icon: 'far fa-file-archive' });
                        break;
                    default:
                        switch (this.props.type) {
                            case "rar":
                                this.setState({ icon: 'far fa-file-archive' });
                                break;
                            case "7z":
                                this.setState({ icon: 'far fa-file-archive' });
                                break;
                            case "zipx":
                                this.setState({ icon: 'far fa-file-archive' });
                                break;
                            case "gz":
                                this.setState({ icon: 'far fa-file-archive' });
                                break;
                            case "jar":
                                this.setState({ icon: 'far fa-file-archive' });
                                break;
                            case "java":
                                this.setState({ icon: 'far fa-file-code' });
                                break;
                            case "js":
                                this.setState({ icon: 'far fa-file-code' });
                                break;
                            case "py":
                                this.setState({ icon: 'far fa-file-code' });
                                break;
                            case "html":
                                this.setState({ icon: 'far fa-file-code' });
                                break;
                            case "c":
                                this.setState({ icon: 'far fa-file-code' });
                                break;
                            case "cs":
                                this.setState({ icon: 'far fa-file-code' });
                                break;
                            case "css":
                                this.setState({ icon: 'far fa-file-code' });
                                break;
                            case "scss":
                                this.setState({ icon: 'far fa-file-code' });
                                break;
                            case "lua":
                                this.setState({ icon: 'far fa-file-code' });
                                break;
                            case "cpp":
                                this.setState({ icon: 'far fa-file-code' });
                                break;
                            case "class":
                                this.setState({ icon: 'far fa-file-code' });
                                break;
                            case "asm":
                                this.setState({ icon: 'far fa-file-code' });
                                break;
                            case "h":
                                this.setState({ icon: 'far fa-file-code' });
                                break;
                            case "bat":
                                this.setState({ icon: 'far fa-file-code' });
                                break;
                            case "go":
                                this.setState({ icon: 'far fa-file-code' });
                                break;
                            case "json":
                                this.setState({ icon: 'far fa-file-code' });
                                break;
                            default:
                                this.setState({ icon: 'far fa-file' });
                                break;
                        }
                        break;
                }
                break;

            default:
                this.setState({ icon: 'far fa-file' });
                break;
        }
        this.setState({ needsIcons: this.state.needsIcons+1 });
    }

    render() {
        if (this.state.needsIcons < 2) {
            this.getIcon();
        }
        return (
            <div className={styles.file}>
                <div className={styles.icon}>
                    <i className={this.state.icon} />
                </div>
                <div className={styles.nameCont}>
                    <p className={styles.name}>{this.props.fileName}</p>
                </div>
                <div className={styles.sizeCont}>
                    <p className={styles.size}>{this.props.fileSize}</p>
                </div>
                <div className={styles.toolCont}>
                    <FileTools path={this.props.path} rawName={this.props.rawName} />
                </div>
                <div className={styles.typeCont}>
                    <p className={styles.type}>{this.props.type}</p>
                </div>
            </div>
        )
    }
}