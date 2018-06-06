import React from 'react';

class App extends React.Component {
    state = {
        searchUser: '',
        user: [],
        repos: [],
        loaded: false
    }

    clearInfo() {
        this.setState({
            searchUser: '',
            user: [],
            repos: [],
            loaded: false
        })
    }

    onChangeValue(event) {
        this.setState({searchUser: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        const {searchUser} = this.state;
        const url = `https://api.github.com/users/${searchUser}`;
        const urlRepos = `https://api.github.com/users/${searchUser}/repos`;
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({user: data, loaded: true}))
        fetch(urlRepos)
            .then(response => response.json())
            .then(data => this.setState({repos: data}))
    }

    render() {
        return (
            <div className="container top">
                <div className="card col-8 offset-2 main shadow">
                    {!this.state.loaded ?
                        <div className="card-body text-center vcenter">
                            <div className="col-6 offset-3">
                                <h5 className="card-title">
                                    Please provide username
                                </h5>
                                <form onSubmit={event => this.onSubmit(event)}>
                                    <div className="form-group col-12">
                                        <input type="text"
                                            id="userName"
                                            placeholder='Username'
                                            className="form-control text-center"
                                            onChange={event => this.onChangeValue(event)}
                                        />
                                    </div>
                                    <button className="btn btn-primary col-8">Find user</button>
                                </form>
                            </div>
                        </div> :
                        <div>
                            <Info clearInfo={this.clearInfo.bind(this)} user={this.state.user}/>
                            <List userRepos={this.state.repos}></List>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

class Info extends React.Component {
    render() {
        return (
            <div className="card-header bg-white mb-2 mt-3 px-0 border-bottom-0">
                <div className="row">
                    <div className="col">
                        <img
                            src={this.props.user.avatar_url}
                            className="img-thumbnail rounded avatar"
                        />
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <h4 className="mb-0">
                                {this.props.user.name}
                            </h4>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="row">
                                    <p className="text-muted mb-0">
                                        login: {this.props.user.login}
                                    </p>
                                </div>
                                <div className="row">
                                    <p className="text-muted mb-0">
                                        email: {this.props.user.email ? this.props.user.email : '-'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <button
                            type="button"
                            className="close icon-lg"
                            aria-label="Close"
                            onClick={this.props.clearInfo}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

class List extends React.Component {
    render() {
        const reposList = this.props.userRepos.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at)).map((repo, i) => {
            return <ListElement key={i} repo={repo}/>
        })

        return (
            <table className="table table-striped table-hover mb-4">
                <thead>
                    <tr>
                        <th scope="col">Repository</th>
                        <th scope="col">Last update</th>
                        <th scope="col">Language</th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.userRepos.length > 0 ? (
                        reposList
                    ) : (<tr colSpan="4"></tr>)
                    }
                </tbody>
            </table>
        )
    }
}

class ListElement extends React.Component {
    goToRepo() {
        window.open(this.props.repo.html_url, "_blank")
    }

    render() {
        const lastUpdateDate = this.props.repo.updated_at.slice(0,10)
        const lastUpdateTime = this.props.repo.updated_at.slice(11,19)

        return (
            <tr onClick={this.goToRepo.bind(this)} className="clickable-row">
                <th>{this.props.repo.name}</th>
                <td>{lastUpdateDate} {lastUpdateTime}</td>
                <td>{this.props.repo.language}</td>
                <td><i className="fas fa-angle-right"></i></td>
            </tr>
        )
    }
}

export default App;
