import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost } from '../../actions/postActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { api } from '../../actions/api';

const PostForm = ({ auth, errors, addPost }) => {
  const [newData, setData] = useState(null);
  const [text, setText] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [quantitat, setQuantitat] = useState('');
  const [unitat, setUnitat] = useState('');

  api.get('/contrib/new', setData);

  useEffect(() => {
    // You can handle side effects or validations here
    // For example, updating unitat based on selectedType
    // setUnitat('Kilometres');
  }, [selectedType]);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    // You can also set unitat based on the selectedType here
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { user } = auth;
    const newPost = {
      text,
      name: user.name,
    };

    addPost(newPost);
    // Clear form data after submission
    setText('');
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <h1 style={{ textAlign: 'center' }}>Nova acció</h1>

        <div style={{ width: '50%', margin: 'auto auto', textAlign: 'center' }}>
          <form className="p-2 bg-light border rounded" onSubmit={onSubmit}>
            <div className="row g-2">
              <div className="col-md">
                <div className="form-floating mb-3">
                <select
                    className="form-control custom-select-lg"
                    id="tipus"
                    name="tipus"
                    value={selectedType}
                    onChange={handleTypeChange}>
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
                    value={quantitat}
                    onChange={(e) => setQuantitat(e.target.value)}
                  />
                  <input type="hidden" className="form-control" id="unitat" name="unitat" value={unitat} />
                  <label className="form-label" htmlFor="quantitat" id="unitats" name="unitats">
                    Indica els <span id="unitatLabel">{unitat}</span>
                  </label>
                </div>
              </div>
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
  errors: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addPost })(PostForm);
