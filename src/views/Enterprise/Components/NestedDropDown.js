import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './NestedDropDown.css'; // Custom CSS for styling

const NestedDropDown = ({ architecturename }) => {
    const architectureOptions = ['Element Objects', 'Relationship Objects'];

    const additionalOptions = {
        'Element Objects': [
            'Select All',
            'Information System Service', 'Logical Application Component', 'Physical Application Component', 'Actor',
            'Business Capability', 'Business Services', 'Contract', 'Undefined', 'Course of Action', 'Driver', 'Event',
            'Function', 'Goal', 'Measure', 'Objective', 'Organization Unit', 'Process', 'Product', 'Role', 'Service Quality',
            'Value Stream', 'Data Entity', 'Logical Data Component', 'Physical Data Component', 'Desktop Equipment',
            'Logical Technology Component', 'Network Component', 'Physical Technology Component', 'Technology Service',
            'Principle', 'Constraint', 'Requirement', 'Location', 'Gap', 'Work Package', 'Capability'
        ],
        'Relationship Objects': ['Select All', 'Composition', 'Aggregation', 'Assignment', 'Realization', 'Serving', 'Access', 'Association', 'Triggering', 'Influence'],
    };

    const [showDropdown, setShowDropdown] = useState(false);
    const [hoveredOption, setHoveredOption] = useState(null);

    const toggleDropdown = () => {
        if (architecturename) {
            setShowDropdown(!showDropdown);
        }
    };

    const handleOptionMouseEnter = (option) => {
        setHoveredOption(option);
    };

    const handleOptionMouseLeave = () => {
        setHoveredOption(null);
    };

    const handleOptionClick = (option) => {
        alert(`You selected: ${option}`);
    };

    return (
        <div className="dropdown-container">
            <div
                className="parent-dropdown"
                onClick={toggleDropdown}
                style={{
                    cursor: architecturename ? 'pointer' : 'not-allowed',
                    backgroundColor: architecturename ? 'white' : '#f0f0f0',
                    color: architecturename ? 'black' : '#aaa',
                }}
            >
                {architecturename || 'No Architecture Selected'}
                {architecturename && (
                    <ArrowDropDownIcon
                        className="dropdown-icon"
                        sx={{
                            transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease',
                        }}
                    />
                )}
            </div>

            {showDropdown && architecturename && (
                <div className="main-dropdown">
                    {architectureOptions.map((option) => (
                        <div
                            key={option}
                            className="main-option"
                            onMouseEnter={() => handleOptionMouseEnter(option)}
                            onMouseLeave={handleOptionMouseLeave}
                            style={{
                                fontSize: '12px',
                                border: '1px solid #fff',
                                borderRadius: '4px',
                                padding: '5px',
                            }}
                        >
                            {option}
                            <ArrowDropDownIcon
                                sx={{
                                    transform: 'rotate(270deg)',
                                    transition: 'transform 0.3s ease',
                                    float: 'right',
                                }}
                            />

                            {hoveredOption === option && (
                                <div
                                    className="additional-submenu"
                                    style={{ position: 'absolute', marginTop: '10px' }}
                                >
                                    {additionalOptions[option].map((extraOption) => (
                                        <div
                                            key={extraOption}
                                            className="additional-option"
                                            style={{ fontSize: '12px', padding: '5px' }}
                                            onClick={() => handleOptionClick(extraOption)}
                                        >
                                            {extraOption}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NestedDropDown;
