import React from 'react';
import styled, { css } from 'styled-components';

const SnakeBoard = styled.div`
    width:500px;
    height:500px;
`
const Muscle = styled.div<{ left: number, right: number, bottom: number, top: number, }>`
    margin-left:${props => props.left + 'px'};
    margin-right:${props => props.right + 'px'};
    margin-top:${props => props.bottom + 'px'};
    margin-bottom:${props => props.top + 'px'};
    width: 25px;
    height: 25px;
    background: antiquewhite;
`
/**
 * class: snakebody
 */
export class SnakeBody extends React.PureComponent<any, any> {

    createCSS() {
        let styles = `position:relative;
        width:500px;
        height:500px;
        background: linear-gradient(to right, #002395, #002395 33.33%, white 33.33%, white 66.66%, #ed2939 66.66%);`;
        return css`${styles}`;
    }

    /**
     * declarations...
     */
    id: null | ReturnType<typeof setTimeout> = null;
    speed: number = 0.5;
    movement: number = 0;
    directions: string = 'right';
    limit: number = 460;
    totalDesigns = 10;
    BoardFloor = styled.div`
        ${this.createCSS()};
    `

    // constructor
    constructor(props: any) {
        super(props);
        this.state = {
            gameEnds: false,
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            "+": function (val: number) {
                return val + 10
            },
            "-": function (val: number) {
                return val - 10
            }
        }
    }

    // gets called after this component is mounted
    componentDidMount() {
        document.addEventListener('keyup', (e: KeyboardEvent) => {
            console.log(e.keyCode);
            switch (e.keyCode) {
                case 37:
                    this.directions = 'left';
                    break;
                case 39:
                    this.directions = 'right';
                    break;
                case 38:
                    this.directions = 'top';
                    break;
                case 40:
                    this.directions = 'bottom';
                    break;
            }
        })

        this.id = setInterval(() => {
            if (this.state['left'] > this.limit || this.state['left'] < 0) {
                console.log('game ends!')
                this.setState({ gameEnds: true })
            } else if (this.state['bottom'] < 0 || this.state['bottom'] > this.limit) {
                console.log('game ends!')
                this.setState({ gameEnds: true })
            }

            if (this.state.gameEnds) {
                if (this.id) clearInterval(this.id);
            }

            this.setState({
                [this.directions === 'top' ? 'bottom' : (this.directions === 'right' ? 'left' : this.directions)]: ((this.directions === 'right' || this.directions === 'bottom') ? this.state["+"](this.state[(this.directions === 'right' ? 'left' : this.directions)]) : this.state["-"](this.state[(this.directions === 'top' ? 'bottom' : this.directions === 'right' ? 'left' : this.directions)]))
            })
        }, this.speed * 200)
    }

    render() {
        return <>
            <SnakeBoard>
                <Muscle left={this.state.left} right={this.state.right} top={this.state.top} bottom={this.state.bottom} />
                <this.BoardFloor />
            </SnakeBoard>
        </>
    }
}