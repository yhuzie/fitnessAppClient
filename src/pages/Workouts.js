import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, Modal, Card } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import UserContext from '../UserContext';
import { FaPlus, FaEdit, FaTrashAlt, FaCheckCircle } from 'react-icons/fa';

export default function Workouts() {
    const { user } = useContext(UserContext);
    const [view, setView] = useState('');
    const [newWorkout, setNewWorkout] = useState({ name: '', duration: '', status: 'Active' });
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [workoutId, setWorkoutId] = useState('');
    const [workoutName, setWorkoutName] = useState('');
    const [workoutDuration, setWorkoutDuration] = useState('');
    const [workoutStatus, setWorkoutStatus] = useState('Active');
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        if (!user?.token) return;
        getWorkouts();
    }, [user]);

    const getWorkouts = async () => {
        if (!user || !user.token) return;
        setLoading(true);
        try {
            const response = await fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${user.token}` },
            });
            const data = await response.json();
            if (response.ok) {
                setWorkouts(data.workouts);
            } else {
                toast.error('Unable to fetch workouts');
            }
        } catch (error) {
            toast.error('Unable to fetch workouts');
        }
        setLoading(false);
    };

    const refreshPage = () => {
        getWorkouts();
        setView('getWorkouts');
    };

    const addWorkout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
                body: JSON.stringify(newWorkout),
            });
            if (response.ok) {
                toast.success('Workout added successfully');
                setNewWorkout({ name: '', duration: '', status: 'Active' });
                handleClose();
                refreshPage();
            } else {
                const data = await response.json();
                toast.error(data.message || 'Unable to add workout');
            }
        } catch (error) {
            toast.error('Unable to add workout');
        }
    };

    const updateWorkout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/updateWorkout/${workoutId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
                body: JSON.stringify({ name: workoutName, duration: workoutDuration, status: workoutStatus }),
            });
            if (response.ok) {
                toast.success('Workout updated successfully');
                refreshPage();
            } else {
                const data = await response.json();
                toast.error(data.message || 'Unable to update workout');
            }
        } catch (error) {
            toast.error('Unable to update workout');
        }
    };

    const deleteWorkout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/deleteWorkout/${workoutId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${user.token}` },
            });
            if (response.ok) {
                toast.success('Workout deleted successfully');
                refreshPage();
            } else {
                toast.error('Unable to delete workout');
            }
        } catch (error) {
            toast.error('Unable to delete workout');
        }
    };

    const completeWorkoutStatus = async (workoutId) => {
        if (!workoutId) {
            toast.error('Please enter a Workout ID');
            return;
        }
        try {
            const response = await fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/completeWorkoutStatus/${workoutId}`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${user.token}` },
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Workout updated successfully.');
                refreshPage();
            } else {
                toast.error(data.message || 'Unable to mark workout as completed');
            }
        } catch (error) {
            toast.error('Unable to mark workout as completed');
        }
    };

    return (
        <div className="workout-dashboard">
            <h1 className="dashboard-title">Workouts</h1>
            <div className="button-group">
                <Button id="addWorkout" className="m-2" variant="primary" onClick={handleShow}>
                    <FaPlus /> Add Workout
                </Button>
                <Button className="m-2" variant="success" onClick={refreshPage}>
                    <FaCheckCircle /> Refresh
                </Button>
                <Button className="m-2" variant="warning" onClick={() => setView('updateWorkout')}>
                    <FaEdit /> Update Workout
                </Button>
                <Button className="m-2" variant="danger" onClick={() => setView('deleteWorkout')}>
                    <FaTrashAlt /> Delete Workout
                </Button>
            </div>

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <>
                    {view === 'getWorkouts' && (
                        <div className="mt-4">
                            <h3>Workouts List</h3>
                            <div className="workout-list d-flex flex-wrap">
                                {workouts.map((workout) => (
                                    <Card key={workout._id} className="workout-card mb-4 me-4" style={{ width: '18rem' }}>
                                        <Card.Body>
                                            <Card.Title>{workout.name}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                <strong>Status:</strong> {workout.status}
                                            </Card.Subtitle>
                                            <Card.Text>
                                                <strong>Duration:</strong> {workout.duration} minutes
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Date Added:</strong> {new Date(workout.dateAdded).toLocaleDateString()}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Workout ID:</strong> {workout._id}
                                            </Card.Text>
                                            <Button
                                                variant="warning"
                                                onClick={() => {
                                                    setWorkoutId(workout._id);
                                                    setWorkoutName(workout.name);
                                                    setWorkoutDuration(workout.duration);
                                                    setWorkoutStatus(workout.status);
                                                    setView('updateWorkout');
                                                }}
                                            >
                                                <FaEdit /> Update
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => {
                                                    setWorkoutId(workout._id);
                                                    setView('deleteWorkout');
                                                }}
                                                className="mt-2"
                                            >
                                                <FaTrashAlt /> Delete
                                            </Button>
                                            {/* Complete Workout button */}
                                            {workout.status !== 'Completed' && (
                                                <Button
                                                    variant="success"
                                                    onClick={() => completeWorkoutStatus(workout._id)}
                                                    className="mt-2"
                                                >
                                                    <FaCheckCircle /> Complete Workout
                                                </Button>
                                            )}
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {view === 'updateWorkout' && (
                        <Form onSubmit={updateWorkout} className="mt-4">
                            <h3>Update Workout</h3>
                            <Form.Group controlId="workoutId">
                                <Form.Label>Workout ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Workout ID"
                                    value={workoutId}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group controlId="workoutName">
                                <Form.Label>Workout Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter workout name"
                                    value={workoutName}
                                    onChange={(e) => setWorkoutName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="workoutDuration">
                                <Form.Label>Workout Duration</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter workout duration"
                                    value={workoutDuration}
                                    onChange={(e) => setWorkoutDuration(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-3">
                                Update Workout
                            </Button>
                        </Form>
                    )}

                    {view === 'deleteWorkout' && (
                        <Form onSubmit={deleteWorkout} className="mt-4">
                            <h3>Delete Workout</h3>
                            <Form.Group controlId="workoutId">
                                <Form.Label>Workout ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter workout ID"
                                    value={workoutId}
                                    onChange={(e) => setWorkoutId(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="danger" type="submit" className="mt-3">
                                Delete Workout
                            </Button>
                        </Form>
                    )}
                </>
            )}

            {/* Modal for adding workout */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Workout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addWorkout}>
                        <Form.Group controlId="workoutName">
                            <Form.Label>Workout Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter workout name"
                                value={newWorkout.name}
                                onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="workoutDuration">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter workout duration (minutes)"
                                value={newWorkout.duration}
                                onChange={(e) => setNewWorkout({ ...newWorkout, duration: e.target.value })}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Add Workout
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
