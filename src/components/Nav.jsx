import chainedFunction from 'chained-function';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NavItem from './NavItem';
import match from '../utils/match-component';
import styles from '../styles/index.styl';
import {
    changeActive, clearActive,
    addHighlighted, clearHighlighted,
    setSelected, onToggle
} from '../redux/actions';

class Nav extends React.PureComponent {
    isNavItem = match(NavItem);

    componentDidMount() {
        this.props.actions.clearHighlighted();
        this.props.actions.setSelected(this.props.selected);
        this.addItems();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selected !== nextProps.selected) {
            this.props.actions.clearHighlighted();
        }
        if (this.props.expanded && !nextProps.expanded) {
            this.props.actions.onToggle();
        }
    }

    componentDidUpdate() {
        this.addItems();
    }

    addItems = () => {
        const { children, localSelected, highlightedItems } = this.props;

        React.Children.map(children, (child, i) => {
            if (React.isValidElement(child) && this.isNavItem(child)) {
                if (child.props.eventKey === localSelected && !highlightedItems.includes(child.props.eventKey)) {
                    this.props.actions.addHighlighted(child.props.eventKey);
                }
            }
        });
    }

    changeSelected = (selected) => {
        this.props.actions.clearHighlighted();
        this.props.actions.setSelected(selected);
    }

    changeActiveItems = (eventKey, level) => {
        const { activeItems, expanded, actions: { setSelected, changeActive } } = this.props;

        setSelected(undefined);

        if (activeItems[level] === eventKey && expanded) {
            changeActive({ eventKey: null, level });
        } else {
            changeActive({ eventKey, level });
        }
    }

    renderNavItem(child, { onSelect, ...props }) {
        return cloneElement(child, {
            ...props,
            onSelect: chainedFunction(
                child.props.onSelect,
                this.changeSelected,
                onSelect
            )
        });
    }

    render() {
        const {
            componentType, // eslint-disable-line
            componentClass: Component,
            onSelect,
            defaultSelected, // eslint-disable-line
            addHighlightedItem, //eslint-disable-line 
            expanded,
            className,
            children,
            highlightedItems,
            localSelected,
            activeItems,
            actions: {addActiveItem, addHighlighted, clearActive, clearHighlighted, setSelected}, // eslint-disable-line
            ...props
        } = this.props;

        return (
            <Component
                {...props}
                role="menu"
                className={cx(
                    className,
                    styles.sidenavNav,
                    { [styles.expanded]: expanded }
                )}
            >
                {React.Children.map(children, (child, i) => {
                    if (React.isValidElement(child) && this.isNavItem(child)) {
                        return this.renderNavItem(child, {
                            onSelect,
                            selected: localSelected,
                            expanded: expanded &&
                              (child.props.eventKey === localSelected || activeItems['0'] === child.props.eventKey),
                            subLevel: 0,
                            addActiveItem: this.changeActiveItems,
                            activeItems: activeItems,
                            highlightedItems: highlightedItems,
                            addHighlightedItem: addHighlighted
                        });
                    }
                    return child;
                })}
            </Component>
        );
    }
}

Nav.propTypes = {
    componentType: PropTypes.any,
    componentClass: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
    ]),
    onSelect: PropTypes.func,
    selected: PropTypes.any,
    defaultSelected: PropTypes.any,
    expanded: PropTypes.bool,
    highlightedItems: PropTypes.arrayOf(PropTypes.string),
    activeItems: PropTypes.shape({}),
    localSelected: PropTypes.string,
    actions: PropTypes.shape({
        addHighlighted: PropTypes.func,
        clearHighlighted: PropTypes.func,
        changeActive: PropTypes.func,
        clearActive: PropTypes.func,
        setSelected: PropTypes.func,
        onToggle: PropTypes.func
    })
};

Nav.defaultProps = {
    componentClass: 'div'
};

Nav.defaultProps.componentType = Nav;

const mapStateToProps = state => {
    return {
        activeItems: state.items.activeItems,
        highlightedItems: state.items.highlightedItems,
        localSelected: state.items.selected
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        changeActive: changeActive,
        clearActive: clearActive,
        addHighlighted: addHighlighted,
        clearHighlighted: clearHighlighted,
        setSelected: setSelected,
        onToggle: onToggle
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
