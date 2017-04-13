class CriticalFlightsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_critical_flight, only: [:show, :edit, :update, :destroy]

  # GET /critical_flights
  # GET /critical_flights.json
  def index
    @critical_flights = CriticalFlight.all
    puts "THIS IS THE TYPE OF ALL FLIGHTS"
    respond_to do |format|
      format.html
      format.json { render :json => @critical_flights.to_json(include: [{ :recovery => { :include => :flight }}, :flight]) }
    end
  end

  def updateFavorites
    cFlight = CriticalFlight.find(params[:critical_flight])
    favStatus = params[:favorite]
    puts "\n\n\nFAV STATUS ................................................."
    puts favStatus
    if favStatus
     if current_user.favorite == nil
      current_user.favorite = []
      current_user.save
     end
     current_user.push(cFlight.id)
    else
     if current_user.favorite != nil
       current_user.favorite.delete_if {|f| f==cFlight.id}
     end
    end
    
    respond_to do |format|
      #if newRecovery.save
      
      #else
        
      #end
      return true
    end
  end


  def addRecovery
    cFlight = CriticalFlight.find(params[:critical_flight])
    newRecovery = Recovery.new
    newRecovery.flight_id = Flight.find_by_leg(params[:flight_leg].to_i).id

    newRecovery.critical_flight_id = params[:critical_flight]
    respond_to do |format|
      if newRecovery.save
        puts "new recovery saved"
        ActionCable.server.broadcast 'critical_flight_channel',
                content:  JSON.parse(newRecovery.to_json(include: :flight)),
                action: "addrecovery"
        head :ok
        return
      else
        puts "not saved"
        puts newRecovery.errors
        format.html { render json: newRecovery.errors, status: :unprocessable_entity}
        format.json { render json: newRecovery.errors, status: :unprocessable_entity }
        flash.now[:alert] = 'Error while adding recovery option!'
        return
      end
    end
  end

  def changeRecoveryReaction
    cFlight = CriticalFlight.find(params[:critical_flight])
    critical_flight_id = params[:critical_flight];
    recoveryid = params[:recovery]
    department = params[:department]
    reactionNumber = params[:recovery_reaction]
    returnHash = Hash["critical_flight_id" => critical_flight_id, "recovery_id" => recoveryid, "department" => department, "reaction_number" => reactionNumber];
    puts "STEP 1"
    cFlight.recovery.each{ |r|
      print "#{r.id} == #{recoveryid}"
      if(r.id.to_i == recoveryid.to_i)
        dRecovery = r
        dRecovery[department] = reactionNumber
        dRecovery.save
        puts "RECOVERy"
        puts dRecovery
        ActionCable.server.broadcast 'critical_flight_channel',
                                   content:  returnHash,
                                   action: "recoveryreaction"
        head :ok
      end
    }
  end

  def removeRecovery
    cFlight = CriticalFlight.find(params[:critical_flight])
    critical_flight_id = params[:critical_flight]
    recoveryid = params[:recovery]
    dRecovery = nil
    print "Recovery ID: #{recoveryid} ; CFlightID: #{params[:critical_flight]}"
    cFlight.recovery.each{ |r|
      if(r.id.to_i == recoveryid.to_i)
        dRecovery = r
        dRecovery.destroy
        returnHash = Hash["critical_flight_id" => critical_flight_id, "recovery_id" => recoveryid]

        # cFlight.recovery.delete(r.id)
        #
        # dRecovery.destroy
        print "RETURN HASH"
        puts returnHash
        cFlight.save
        ActionCable.server.broadcast 'critical_flight_channel',
                                   content:  returnHash,
                                   action: "removerecovery"
        head :ok
        return
      end
    }
  end

  def acceptRecovery
    cFlight = CriticalFlight.find(params[:critical_flight])
    critical_flight_id = params[:critical_flight]
    recoveryid = params[:recovery]
    dRecovery = nil
    print "Recovery ID: #{recoveryid} ; CFlightID: #{params[:critical_flight]}"
    removed_recovery = []
    cFlight.recovery.each{ |r|
      if(r.id.to_i == recoveryid.to_i)
        r.selected = true

        cFlight.save
        returnHash = Hash["critical_flight_id" => critical_flight_id, "recovery_id" => recoveryid]
        ActionCable.server.broadcast 'critical_flight_channel',
                                   content:  returnHash,
                                   action: "acceptrecovery"
        head :ok
      end
    }
    return
  end

  # GET /critical_flights/1
  # GET /critical_flights/1.json
  def show
    @critical_flight = CriticalFlight.find(params[:id])
    puts @critical_flight.recovery
    # puts "THIS IS A MESSAGE"
    respond_to do |format|
      format.html
      format.json { render :json => @critical_flight.to_json(:include => :recovery) }
    end
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
    puts critical_flight_params
    puts params.keys
    foundFlight = Flight.find_by_leg(params[:critical_flight][:flight_leg])
    puts "FLIGHT FOUND: "
    puts params[:critical_flight][:flight_leg]
    puts foundFlight
    # params.except(:password, :password_confirmation, :credit_card)
    # @critical_flight = CriticalFlight.new(params[:critical_flight].permit(:event))
    @critical_flight = CriticalFlight.new(critical_flight_params.except(:flight_leg, :authenticity_token))
    @critical_flight.event = params[:critical_flight][:event]
    respond_to do |format|
      @critical_flight.flight = foundFlight
      puts @critical_flight
      if @critical_flight.save
        puts "saved"
        flash.now[:notice] = 'Flight Saved'
        format.html { render :json => @critical_flights.to_json(include: [{ :recovery => { :include => :flight }}, :flight]) , status: :created}
        format.json { render :json => @critical_flights.to_json(include: [{ :recovery => { :include => :flight }}, :flight]) , status: :created}
        puts "about to broadcast"
        ActionCable.server.broadcast 'critical_flight_channel',
                                   content:  JSON.parse(@critical_flight.to_json(include: [{ :recovery => { :include => :flight }}, :flight])),
                                   action: "flightcreate"
              head :ok
        puts "finished broadcast"
      else
        puts "not saved"
        format.html { render :new }
        format.json { render json: @critical_flight.errors, status: :unprocessable_entity }
        flash.now[:alert] = 'Error while creating flight!'
      end
      puts "completes"
      return
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
      params.require(:critical_flight).permit(:event, :flight_leg, "event")
    end
end
