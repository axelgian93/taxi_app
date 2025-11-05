//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:taxi_openapi/src/model/admin_payments_report200_response_totals.dart';
import 'package:built_collection/built_collection.dart';
import 'package:taxi_openapi/src/model/admin_payments_summary_status200_response_items_inner.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'admin_payments_summary_status200_response.g.dart';

/// AdminPaymentsSummaryStatus200Response
///
/// Properties:
/// * [items] 
/// * [totals] 
@BuiltValue()
abstract class AdminPaymentsSummaryStatus200Response implements Built<AdminPaymentsSummaryStatus200Response, AdminPaymentsSummaryStatus200ResponseBuilder> {
  @BuiltValueField(wireName: r'items')
  BuiltList<AdminPaymentsSummaryStatus200ResponseItemsInner>? get items;

  @BuiltValueField(wireName: r'totals')
  AdminPaymentsReport200ResponseTotals? get totals;

  AdminPaymentsSummaryStatus200Response._();

  factory AdminPaymentsSummaryStatus200Response([void updates(AdminPaymentsSummaryStatus200ResponseBuilder b)]) = _$AdminPaymentsSummaryStatus200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AdminPaymentsSummaryStatus200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AdminPaymentsSummaryStatus200Response> get serializer => _$AdminPaymentsSummaryStatus200ResponseSerializer();
}

class _$AdminPaymentsSummaryStatus200ResponseSerializer implements PrimitiveSerializer<AdminPaymentsSummaryStatus200Response> {
  @override
  final Iterable<Type> types = const [AdminPaymentsSummaryStatus200Response, _$AdminPaymentsSummaryStatus200Response];

  @override
  final String wireName = r'AdminPaymentsSummaryStatus200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AdminPaymentsSummaryStatus200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.items != null) {
      yield r'items';
      yield serializers.serialize(
        object.items,
        specifiedType: const FullType(BuiltList, [FullType(AdminPaymentsSummaryStatus200ResponseItemsInner)]),
      );
    }
    if (object.totals != null) {
      yield r'totals';
      yield serializers.serialize(
        object.totals,
        specifiedType: const FullType(AdminPaymentsReport200ResponseTotals),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AdminPaymentsSummaryStatus200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AdminPaymentsSummaryStatus200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'items':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(AdminPaymentsSummaryStatus200ResponseItemsInner)]),
          ) as BuiltList<AdminPaymentsSummaryStatus200ResponseItemsInner>;
          result.items.replace(valueDes);
          break;
        case r'totals':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(AdminPaymentsReport200ResponseTotals),
          ) as AdminPaymentsReport200ResponseTotals;
          result.totals.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AdminPaymentsSummaryStatus200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AdminPaymentsSummaryStatus200ResponseBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

