require 'test_helper'

class RecoveriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @recovery = recoveries(:one)
  end

  test "should get index" do
    get recoveries_url
    assert_response :success
  end

  test "should get new" do
    get new_recovery_url
    assert_response :success
  end

  test "should create recovery" do
    assert_difference('Recovery.count') do
      post recoveries_url, params: { recovery: { AB: @recovery.AB, CS: @recovery.CS, DX: @recovery.DX, ITP: @recovery.ITP, MX: @recovery.MX, OPS: @recovery.OPS, OS: @recovery.OS, SC: @recovery.SC, leg: @recovery.leg, selected: @recovery.selected, tail: @recovery.tail } }
    end

    assert_redirected_to recovery_url(Recovery.last)
  end

  test "should show recovery" do
    get recovery_url(@recovery)
    assert_response :success
  end

  test "should get edit" do
    get edit_recovery_url(@recovery)
    assert_response :success
  end

  test "should update recovery" do
    patch recovery_url(@recovery), params: { recovery: { AB: @recovery.AB, CS: @recovery.CS, DX: @recovery.DX, ITP: @recovery.ITP, MX: @recovery.MX, OPS: @recovery.OPS, OS: @recovery.OS, SC: @recovery.SC, leg: @recovery.leg, selected: @recovery.selected, tail: @recovery.tail } }
    assert_redirected_to recovery_url(@recovery)
  end

  test "should destroy recovery" do
    assert_difference('Recovery.count', -1) do
      delete recovery_url(@recovery)
    end

    assert_redirected_to recoveries_url
  end
end
