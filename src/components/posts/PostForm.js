import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost } from '../../actions/postActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { api } from '../../actions/api';
import { SET_INPUT_VALUE } from '../../actions/types';

const PostForm = ({ auth, errors, addPost }) => {
  const dispatch = useDispatch();
  const inputValues = useSelector((state) => state.inputValues || {});
  const [newData, setData] = useState(null);
  const [text, setText] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [quantitat, setQuantitat] = useState('');
  const [unitat, setUnitat] = useState('');

  useEffect(() => {
    api.get('/api/posts/contribtypes').then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  const handleInputChange = (fieldName, value) => {
    console.log(fieldName, value);
    dispatch({
      type: SET_INPUT_VALUE,
      payload: {
        fieldName,
        value,
      },
    }); 
    
    // Use the updated value directly
    const selectedTypeObject = newData.find((type) => type.name === value);
    const selectedTypeUnit = selectedTypeObject ? selectedTypeObject.unit : '';
    setUnitat(selectedTypeUnit);
  };  

  const onSubmit = (e) => {
    e.preventDefault();
    const { user } = auth;
    const newPost = {
      text: 'do',
      quantitat: inputValues.quantitat,
      tipus: inputValues.tipus,
      unitat: inputValues.unitat,
      name: user.name,
    };
    addPost(newPost);
    // Handle the form data as needed
    console.log('Form Data:', newPost);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <h1 style={{ textAlign: 'center' }}>Comparteix la teva</h1>
        <div style={{ width: '50%', margin: 'auto auto', textAlign: 'center' }}>
          <form className="p-2 bg-light border rounded" onSubmit={onSubmit}>
            <div className="row g-2">
              <div className="col-md">
                <div className="form-floating mb-3">
                  <select
                    className="form-control custom-select-lg"
                    id="tipus"
                    name="tipus"
                    value={inputValues.tipus}
                    onChange={(e) => handleInputChange('tipus', e.target.value)}>
                    <option value="" selected></option>
                    {newData &&
                      newData.map((option) => (
                        <option key={option.name} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                  </select>
                  <label htmlFor="tipus" className="form-label">
                    Tipus d'acció
                  </label>
                </div>
              </div>
              <div className="col-md">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="quantitat"
                    name="quantitat"
                    value={inputValues.quantitat}
                    onChange={(e) => handleInputChange('quantitat', e.target.value)}
                  />
                  <input type="hidden" className="form-control" id="unitat" name="unitat" value={inputValues.unitat} />
                  <label className="form-label" htmlFor="quantitat" id="unitats" name="unitats">
                    Indica els <span id="unitatLabel">{inputValues.unitat}</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="row g-2">
              <div className="col-md">
                <div className="form-floating mb-3">
                  <input className="form-control" type="text" name="name" />
                  <label htmlFor="name" className="form-label">
                    Posa-hi un nom
                  </label>
                </div>
              </div>
              <div className="col-md">
                <div className="form-floating mb-3">
                  <input className="form-control" type="text" name="description" />
                  <label htmlFor="tipus" className="form-label">
                    Descripció breu
                  </label>
                </div>
              </div>
            </div>
            <div className="row g-2">
              <div className="col-md">
                <div className="form-floating mb-3">
                  <input type="date" className="form-control" id="dateInput" name="dateInput" />
                  <label htmlFor="dateInput">Data</label>
                </div>
              </div>
              <div className="col-md">
                <div className="form-floating mb-3">
                  <input type="time" className="form-control" id="timeInput" name="timeInput" />
                  <label htmlFor="timeInput">Hora</label>
                </div>
              </div>
            </div>
            <div className="row g-2">
              <div className="col-md">
                <div className="form-floating mb-3">
                  <input className="form-control" type="text" name="lloc" />
                  <label htmlFor="tipus" className="form-label">
                    Lloc
                  </label>
                </div>
              </div>
            </div>
            <div className="form-floating mb-3">
              <input className="form-control" type="file" name="image" accept="image/*" />
              <label htmlFor="tipus" className="form-label">
                Imatge
              </label>
            </div>

            {/* Additional form fields go here */}
            <div className="form-floating mb-3">
              <button type="submit" className="btn btn-success">
                Envia
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  inputValues: state.inputValues,
});

export default connect(mapStateToProps, { addPost })(PostForm);
