class RecoveriesController < ApplicationController
  before_action :set_recovery, only: [:show, :edit, :update, :destroy]

  # GET /recoveries
  # GET /recoveries.json
  def index
    @recoveries = Recovery.all
    respond_to do |format|
      format.html
      format.json { render :json => @recoveries.to_json(:include => :flight) }
    end
  end

  # GET /recoveries/1
  # GET /recoveries/1.json
  def show
  end

  # GET /recoveries/new
  def new
    @recovery = Recovery.new
  end

  # GET /recoveries/1/edit
  def edit
  end

  # POST /recoveries
  # POST /recoveries.json
  def create
    @recovery = Recovery.new(recovery_params)

    respond_to do |format|
      if @recovery.save
        format.html { redirect_to @recovery, notice: 'Recovery was successfully created.' }
        format.json { render :show, status: :created, location: @recovery }
      else
        format.html { render :new }
        format.json { render json: @recovery.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /recoveries/1
  # PATCH/PUT /recoveries/1.json
  def update
    respond_to do |format|
      if @recovery.update(recovery_params)
        format.html { redirect_to @recovery, notice: 'Recovery was successfully updated.' }
        format.json { render :show, status: :ok, location: @recovery }
      else
        format.html { render :edit }
        format.json { render json: @recovery.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /recoveries/1
  # DELETE /recoveries/1.json
  def destroy
    @recovery.destroy
    respond_to do |format|
      format.html { redirect_to recoveries_url, notice: 'Recovery was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recovery
      @recovery = Recovery.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def recovery_params
      params.require(:recovery).permit(:selected, :AB, :OS, :CS, :DX, :OPS, :MX, :ITP, :SC)
    end
end
