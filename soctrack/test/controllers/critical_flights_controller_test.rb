require 'test_helper'

class CriticalFlightsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @critical_flight = critical_flights(:one)
  end

  test "should get index" do
    get critical_flights_url
    assert_response :success
  end

  test "should get new" do
    get new_critical_flight_url
    assert_response :success
  end

  test "should create critical_flight" do
    assert_difference('CriticalFlight.count') do
      post critical_flights_url, params: { critical_flight: { destination: @critical_flight.destination, etd: @critical_flight.etd, event: @critical_flight.event, leg: @critical_flight.leg, source: @critical_flight.source, tail: @critical_flight.tail } }
    end

    assert_redirected_to critical_flight_url(CriticalFlight.last)
  end

  test "should show critical_flight" do
    get critical_flight_url(@critical_flight)
    assert_response :success
  end

  test "should get edit" do
    get edit_critical_flight_url(@critical_flight)
    assert_response :success
  end

  test "should update critical_flight" do
    patch critical_flight_url(@critical_flight), params: { critical_flight: { destination: @critical_flight.destination, etd: @critical_flight.etd, event: @critical_flight.event, leg: @critical_flight.leg, source: @critical_flight.source, tail: @critical_flight.tail } }
    assert_redirected_to critical_flight_url(@critical_flight)
  end

  test "should destroy critical_flight" do
    assert_difference('CriticalFlight.count', -1) do
      delete critical_flight_url(@critical_flight)
    end

    assert_redirected_to critical_flights_url
  end
end
