import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './NestedDropDown.css'; // Custom CSS for styling

const NestedDropDown = () => {
    const architectureOptions = {
        EAXEE: ['Element Objects', 'Relationship Objects'],
        University: ['Element Objects', 'Relationship Objects'],
    };

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

    const [showMainDropdown, setShowMainDropdown] = useState(false);
    const [selectedMainOption, setSelectedMainOption] = useState(null);
    const [hoveredSubOption, setHoveredSubOption] = useState(null);

    const handleParentDropdownToggle = () => {
        setShowMainDropdown(!showMainDropdown);
    };

    const handleMainOptionMouseEnter = (option) => {
        setSelectedMainOption(option);
    };

    const handleMainOptionMouseLeave = () => {
        setSelectedMainOption(null);
    };

    const handleSubOptionClick = (subOption) => {
        alert(`You selected: ${subOption}`);
    };

    const handleSubOptionMouseEnter = (subOption) => {
        setHoveredSubOption(subOption);
    };

    const handleSubOptionMouseLeave = () => {
        setHoveredSubOption(null);
    };

    // .log
    console.log('====================================');
    console.log('SelectedMainOption', selectedMainOption);
    console.log('====================================');

    return (
        <div className="dropdown-container">
            <div className="parent-dropdown" onClick={handleParentDropdownToggle}>
                Select Architecture
                {showMainDropdown ? (
                    <ArrowDropDownIcon sx={{ transform: 'rotate(180deg)', transition: 'transform 0.3s ease' }} />
                ) : (
                    <ArrowDropDownIcon className="dropdown-icon" />
                )}
            </div>

            {showMainDropdown && (
                <div className="main-dropdown">
                    {Object.keys(architectureOptions).map((option) => (

                        <div
                            key={option}
                            className="main-option"
                            onMouseEnter={() => handleMainOptionMouseEnter(option)}
                            onMouseLeave={handleMainOptionMouseLeave}
                        >
                            <div style={{ fontSize: "12px" }}>
                                {option}
                                <ArrowDropDownIcon sx={{ transform: 'rotate(270deg)', transition: 'transform 0.3s ease', float: "right" }} />
                            </div>
                            {selectedMainOption === option && (
                                <div className="submenu">
                                    {architectureOptions[option].map((subOption, index) => (
                                        <div
                                            key={subOption}
                                            className="submenu-option"
                                            onClick={() => handleSubOptionClick(subOption)}
                                            onMouseEnter={() => handleSubOptionMouseEnter(subOption)}
                                            onMouseLeave={handleSubOptionMouseLeave}
                                            style={{ position: 'relative', fontSize: "12px", border:"1px solid #fff", borderRadius:"4px" }}
                                        >
                                            {subOption}
                                            <ArrowDropDownIcon sx={{
                                                transform: 'rotate(270deg)',
                                                transition: 'transform 0.3s ease', float: "right"
                                            }} />

                                            {hoveredSubOption === subOption && (
                                                <div className="additional-submenu" style={{ top: `${index * 10}px` }}>
                                                    {additionalOptions[subOption].map((extraOption) => (
                                                        <div
                                                            key={extraOption}
                                                            className="additional-option"
                                                            style={{ fontSize: "12px" }}
                                                            onClick={() => alert(`You selected: ${extraOption}`)}
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
                    ))}
                </div>
            )}
        </div>
    );
};

export default NestedDropDown;
