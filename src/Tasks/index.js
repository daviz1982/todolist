import React, { Component } from 'react'
import { ListItem, List } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ActionSend from 'material-ui/svg-icons/content/send'
import BottomNavigation from 'material-ui/BottomNavigation'
import TextField from 'material-ui/TextField'


class Tasks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      tasks: [],
    }
    this.name = null
  }

  componentWillMount = () => {
    this.setState({
      tasks: [
        {
        key: 1,
        val: {
          title: 'Hello world',
        }
      ]
    })
  }

  calculateNextKey = () => {
    let max = 0;
    this.state.tasks.forEach(item => {
      max = max < item.key ? item.key : max
    })
    return ++max
  }

  handleAddTask = () => {
    const title = this.name.getValue()
    if (title.length > 0) {
      const key = this.calculateNextKey()
      const task = {
        key: key,
        val: {
          title: title
        }
      }
      this.name.input.value = ''
      const newTasks = this.state.tasks
      newTasks.push(task)
      this.setState({
        tasks: newTasks
      })
      this.render()
    }
  }

  handleKeyDown = (e, callback) => {
    e.keyCode===13 ? callback() : undefined
  }

  handleDeleteTask = (id) => {
    let newTasks = this.state.tasks.filter((a) => {
      return a.key != id
    });
    this.setState({
      tasks: newTasks
    })
  }

  renderList = tasks => {
    return tasks.map((row, i) => {
      const task = row.val
      const key  = row.key

      return (<div key={key}>
        <ListItem
          key={key}
          primaryText={task.title}
          rightIconButton={
            <IconButton
              onClick={()=>this.handleDeleteTask(key)}
            >
              <ActionDelete />
            </IconButton>
          }
        />
      </div>)
    })
  }

  renderAddTask = () => {
    return (
      <div>
        <BottomNavigation>
          <TextField
            id="text-task"
            onKeyDown={(event)=>{this.handleKeyDown(event, this.handleAddTask)}}
            fullWidth={true}
            ref={(field) => { this.name = field; this.name && this.name.focus() }}
            type="text"
          />
          <IconButton
            onClick={this.handleAddTask}
          >
            <ActionSend />
          </IconButton>
        </BottomNavigation>
      </div>
    )
  }

  render() {
    return (
      <div>
      <List>
        {this.renderList(this.state.tasks)}
      </List>
      {this.renderAddTask()}
      </div>
    )
  }  
}

export default Tasks