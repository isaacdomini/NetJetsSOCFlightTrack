class CriticalFlightsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_critical_flight, only: [:show, :edit, :update, :destroy]

  # GET /critical_flights
  # GET /critical_flights.json
  def index
    @critical_flights = CriticalFlight.all
  end

  # GET /critical_flights/1
  # GET /critical_flights/1.json
  def show
  end

  # GET /critical_flights/new
  def new
    @critical_flight = CriticalFlight.new
  end

  # GET /critical_flights/1/edit
  def edit
  end

  # POST /critical_flights
  # POST /critical_flights.json
  def create
    @critical_flight = CriticalFlight.new(critical_flight_params)

    respond_to do |format|
      if @critical_flight.save
        format.html { redirect_to @critical_flight, notice: 'Critical flight was successfully created.' }
        format.json { render :show, status: :created, location: @critical_flight }
      else
        format.html { render :new }
        format.json { render json: @critical_flight.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /critical_flights/1
  # PATCH/PUT /critical_flights/1.json
  def update
    respond_to do |format|
      if @critical_flight.update(critical_flight_params)
        format.html { redirect_to @critical_flight, notice: 'Critical flight was successfully updated.' }
        format.json { render :show, status: :ok, location: @critical_flight }
      else
        format.html { render :edit }
        format.json { render json: @critical_flight.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /critical_flights/1
  # DELETE /critical_flights/1.json
  def destroy
    @critical_flight.destroy
    respond_to do |format|
      format.html { redirect_to critical_flights_url, notice: 'Critical flight was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_critical_flight
      @critical_flight = CriticalFlight.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def critical_flight_params
      params.require(:critical_flight).permit(:tail, :leg, :source, :destination, :event, :etd)
    end
end
