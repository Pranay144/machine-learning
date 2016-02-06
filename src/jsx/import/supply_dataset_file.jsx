/**
 * supply_dataset_file.jsx: file upload fieldset.
 *
 * @SupplyDatasetFile, must be capitalized in order for reactjs to render it as
 *     a component. Otherwise, the variable is rendered as a dom node.
 *
 * @display_submit, a boolean value, defined via '!== 0'
 *
 * Note: this script implements jsx (reactjs) syntax.
 */

var SupplyDatasetFile = React.createClass({
  // initial 'state properties'
    getInitialState: function() {
        return {
            value: null,
            additional_elements: []
        };
    },
  // update 'state properties': index for additional input elements
    handleAddMore: function(event){
        var elements = this.state.additional_elements;
        elements.push(true);
        this.setState({additional_elements: elements});
    },
    handleRemove: function(event){
        var elements = this.state.additional_elements;
        if (elements.length > 0) {
            elements.pop();
            this.setState({additional_elements: elements});
        }
    },
  // update 'state properties': allow parent component(s) to access properties
    validFileEntered: function(event){
        {/* get array of input elements, by classname */}
        var datasetNodeList = document.getElementsByClassName('svm-dataset-url');

        {/* if input value is empty, store 'false' within corresponding array */}
        var datasetArray = Array.prototype.map.call(datasetNodeList, function(element) {
            if (!element.value) {
                return false;
            }
            else {
                return true;
            }
        });

        {/* check if every element is 'true' */}
        var datasetBoolean = datasetArray.every(function(element) {
            return element == true;
        });

        if (datasetBoolean) {
            this.props.onChange({submitted_proper_dataset: true});
        }
        else {
            this.props.onChange({submitted_proper_dataset: false});
        }
    },
  // triggered when 'state properties' change
    render: function(){
        var inputs = this.state.additional_elements;

        return(
            <fieldset className='fieldset-supply-dataset'>
                <legend>Supply Dataset</legend>
                <input type='file' name='svm_dataset[]' className='svm-dataset-file' onChange={this.validFileEntered} value={this.state.value} />

                {/* array components require unique 'key' value */}
                {inputs && inputs.map(function(value, index){
                    return <input type='file' name='svm_dataset[]' className='svm-dataset-file' key={index} onChange={this.validUrlEntered} value={this.state['value_dataset_' + index.toString()]} />;
                }.bind(this))}

                <input type='button' value='Add more' onClick={this.handleAddMore} />
                <input type='button' value='Remove' onClick={this.removeMore} />
                <p className='form-note'>*<span className='bold'>Note:</span> Uploaded file(s) must be formatted as <span className='italic'>csv</span>, <span className='italic'>json</span>, or <span className='italic'>xml</span> format.</p>
            </fieldset>
        );
    }
});

// indicate which class can be exported, and instantiated via 'require'
export default SupplyDatasetFile
